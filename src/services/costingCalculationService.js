const { findDecisionValues } = require('../config/decisionTable');
const { calculateAllFormulas } = require('../utils/formulaEvaluator');

/**
 * Costing Calculation Service
 * Processes style data and calculates costing values based on decision table
 * Also calculates Type=3 (calculated) cost elements using their formulas
 */

/**
 * Process Style data to calculate Segment PSF and other cost elements
 * @param {Object} styleData - Style data from PLM (transformed to camelCase)
 * @returns {Object} Calculated data ready for PATCH
 */
function processStyleToSegmentPSF(styleData) {
  try {
    console.log('🔄 Starting costing calculations...');

    // Extract required fields from style data (from parsed structure)
    const styleInfo = styleData.styleInfo || styleData;
    const styleId = styleInfo.styleId;
    const styleCode = styleInfo.styleCode;
    const brandId = styleInfo.brandId;
    const subCategoryId = styleInfo.subCategoryId;
    const udf5Id = styleInfo.userDefinedField5Id;

    // Validate required fields
    if (!styleId || !styleCode || !brandId || !subCategoryId || udf5Id === undefined || udf5Id === null) {
      throw new Error('Missing required fields: StyleId, StyleCode, BrandId, SubCategoryId, or UserDefinedField5Id');
    }

    console.log(`📋 Style Info: ID=${styleId}, Code=${styleCode}, Brand=${brandId}, SubCategory=${subCategoryId}, UDF5=${udf5Id}`);

    // Extract Cluster from first colorway's FreeFieldOne
    const styleColorways = styleData.colorways || [];
    if (!styleColorways || styleColorways.length === 0) {
      throw new Error('No StyleColorways found');
    }

    const cluster = styleColorways[0].freeFieldOne;
    if (!cluster) {
      throw new Error('Cluster (FreeFieldOne) not found in first StyleColorway');
    }

    console.log(`🎯 Cluster: ${cluster}`);

    // Get StyleCosting
    const styleCosting = styleData.costing;
    if (!styleCosting) {
      throw new Error('StyleCosting not found');
    }

    // Find all UNLOCKED suppliers (IsLock=false or null)
    const styleCostSuppliers = styleData.costSuppliers || [];
    console.log(`📋 Total Suppliers Found: ${styleCostSuppliers.length}`);
    
    // Filter unlocked suppliers
    const unlockedSuppliers = styleCostSuppliers.filter(supplier => !supplier.isLock);
    
    console.log(`🔓 Unlocked Suppliers: ${unlockedSuppliers.length}`);
    
    // Log all unlocked suppliers
    unlockedSuppliers.forEach((supplier, index) => {
      const supplierInfo = supplier.supplierInfo;
      if (supplierInfo) {
        console.log(`   ${index + 1}. Code="${supplierInfo.code}", Name="${supplierInfo.supplierName}", Id=${supplier.id}, IsLock=${supplier.isLock}`);
      }
    });

    if (unlockedSuppliers.length === 0) {
      throw new Error("No unlocked suppliers found in StyleCostSuppliers");
    }

    console.log(`✅ Will write data for ${unlockedSuppliers.length} unlocked suppliers`);

    // Find decision values from decision table
    const decisionValues = findDecisionValues(brandId, subCategoryId, udf5Id, cluster);
    
    if (!decisionValues) {
      console.warn(`⚠️  No decision values found for BrandId=${brandId}, SubCategoryId=${subCategoryId}, UDF5Id=${udf5Id}, Cluster=${cluster}`);
    } else {
      console.log(`✅ Decision values found:`, decisionValues);
    }

    // Code mapping: Decision Table Key -> Cost Element Code
    // Only Type=3 (calculated) cost elements will be patched
    const codeMapping = {
      'SegmentPSF': { code: 'SPSF', outputKey: 'SPSF' },
      'MU': { code: 'MU', outputKey: 'MU' },
      'KumaşHedefMaliyet': { code: 'KHDF', outputKey: 'KHDF' },
      'AlımFiyatı_TRY': { code: 'ALMTRY', outputKey: 'ALMTRY' },
      'HesaplamaKuru': { code: 'GKUR', outputKey: 'GKUR' },
      'KDV': { code: 'KDV', outputKey: 'KDV' }
    };

    // Extended Field ID mapping
    const extendedFieldMapping = {
      'AlımFiyatı_USD': 'daa197bf-717f-4374-9b0c-5a19b8cb2f3a',
      'SegmentPSF': 'b63395db-8252-4b69-b0bd-6506738081b6',
      'KumaşHedefMaliyet': '45247062-689a-48ca-a4e3-79324c8cbab3',
      'AlımFiyatı_TRY': '79cb5b20-3028-44d4-a85e-ed18c00af3c8',
      'AlımTarget_USD': '93fa0034-ea93-4649-a2b1-43b905d01a49', // RHDF / GKUR
      'AlımTarget_USD_105': 'b3eeb0c5-f089-441c-a3ff-bfd5697ba30f' // (RHDF / GKUR) / 1.05
    };
    
    // Type=3 Cost Element to Extended Field mapping (calculated values)
    const type3ToExtFieldMapping = {
      'TKMS': '14a52574-591e-4082-83e7-6a401808b726',
      'TAST': 'c645f6f2-d537-4234-87c1-7675677ffb86',
      'TISC': 'a28b4eca-999c-4437-bb49-7fda0284993c',
      'TTRM': '556a9af5-6350-4bce-ae83-f1453ec3659b',
      'TISL': '40ea5b12-832b-41e9-aefb-e547d1e6884b',
      'TDGR': 'bc11923a-8594-4f22-b2bb-ab7f5f558ba7'
    };

    const result = {
      StyleId: styleId,
      StyleCode: styleCode,
      BrandId: brandId,
      SubCategoryId: subCategoryId,
      UserDefinedField5Id: udf5Id,
      Cluster: cluster,
      // Array to hold all supplier values for PATCH
      supplierValues: []
    };

    // Get StyleCostElements
    const styleCostElements = styleData.costElements || [];
    console.log(`📋 Total Cost Elements: ${styleCostElements.length}`);

    // Process each mapping - NO TYPE FILTER, just look for the codes we need
    for (const [decisionKey, mapping] of Object.entries(codeMapping)) {
      // Find element with this code (regardless of Type)
      const element = styleCostElements.find(elem => elem.code === mapping.code);

      if (!element) {
        console.warn(`⚠️  Cost Element Code='${mapping.code}' not found in product (skipping)`);
        continue;
      }

      console.log(`📌 Found element: Code=${element.code}, Type=${element.type}, Name=${element.name}`);

      // Get value from decision table (or 0 if not found)
      let decisionValue = 0;
      if (decisionValues && decisionValues[decisionKey] !== undefined) {
        decisionValue = decisionValues[decisionKey];
      } else {
        console.log(`   ℹ️  No decision table value for ${decisionKey}, using 0`);
      }

      // Handle undefined/NaN values -> set to 0
      if (isNaN(decisionValue) || !isFinite(decisionValue)) {
        console.warn(`⚠️  Invalid value for ${decisionKey}, setting to 0`);
        decisionValue = 0;
      }
      
      // Round to 2 decimal places
      decisionValue = Math.round(decisionValue * 100) / 100;

      // Find StyleCostingSupplierVals for ALL UNLOCKED suppliers
      const supplierVals = element.supplierValues || [];
      
      let foundCount = 0;
      for (const unlockedSupplier of unlockedSuppliers) {
        const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === unlockedSupplier.id);
        
        if (targetVal) {
          // Add to supplierValues array for PATCH
          result.supplierValues.push({
            Id: targetVal.Id,
            Value: decisionValue,
            elementCode: mapping.code,
            supplierId: unlockedSupplier.id
          });
          foundCount++;
        }
      }

      console.log(`✅ ${mapping.code}: Type=${element.type}, Value=${decisionValue}, Found ${foundCount}/${unlockedSuppliers.length} supplier values`);
    }

    // Process Extended Fields
    const styleExtendedFieldValues = styleData.extendedFields || [];

    for (const [decisionKey, extFldId] of Object.entries(extendedFieldMapping)) {
      // Find extended field by ExtFldId
      const extField = styleExtendedFieldValues.find(field => field.extFldId === extFldId);

      if (!extField) {
        console.warn(`⚠️  Extended Field ${decisionKey} (${extFldId}) not found (skipping)`);
        continue;
      }

      // Get value from decision table (or 0 if not found)
      let decisionValue = 0;
      if (decisionValues && decisionValues[decisionKey] !== undefined) {
        decisionValue = decisionValues[decisionKey];
      }

      // Handle undefined/NaN values -> set to 0
      if (isNaN(decisionValue) || !isFinite(decisionValue)) {
        console.warn(`⚠️  Invalid value for ${decisionKey}, setting to 0`);
        decisionValue = 0;
      }

      // Store extended field ID and value
      result[`${decisionKey}_extid`] = extField.id;
      result[`${decisionKey}_extvalue`] = decisionValue;

      console.log(`✅ Extended Field ${decisionKey}: Id=${extField.id}, Value=${decisionValue}`);
    }

    // ===== PROCESS VRG AND NAVL (CountryId-based) =====
    console.log('\n🌍 Processing VRG and NAVL based on CountryId...');
    
    // Process VRG and NAVL - values depend on CountryId of each supplier
    const countryBasedElements = ['VRG', 'NAVL'];
    
    for (const elementCode of countryBasedElements) {
      const element = styleCostElements.find(elem => elem.code === elementCode);
      
      if (!element) {
        console.warn(`⚠️  Cost Element Code='${elementCode}' not found in product (skipping)`);
        continue;
      }
      
      console.log(`📌 Found element: Code=${element.code}, Type=${element.type}, Name=${element.name}`);
      
      const supplierVals = element.supplierValues || [];
      let foundCount = 0;
      
      for (const unlockedSupplier of unlockedSuppliers) {
        const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === unlockedSupplier.id);
        
        if (targetVal) {
          // Determine value based on CountryId
          let value;
          if (unlockedSupplier.countryId === 69) {
            value = 1;
          } else {
            // CountryId is not 69 (or null, 0, other)
            value = elementCode === 'VRG' ? 1.38 : 1.08;
          }
          
          result.supplierValues.push({
            Id: targetVal.Id,
            Value: Math.round(value * 100) / 100, // Round to 2 decimals
            elementCode: elementCode,
            supplierId: unlockedSupplier.id
          });
          foundCount++;
          
          console.log(`   Supplier ${unlockedSupplier.id} (CountryId=${unlockedSupplier.countryId}): ${elementCode}=${value}`);
        }
      }
      
      console.log(`✅ ${elementCode}: Found ${foundCount}/${unlockedSuppliers.length} supplier values`);
    }

    // ===== PROCESS RPSF (RetailPrice based) =====
    console.log('\n💰 Processing RPSF (RetailPrice)...');
    
    const rpsfElement = styleCostElements.find(elem => elem.code === 'RPSF');
    if (rpsfElement && styleInfo.retailPrice !== null && styleInfo.retailPrice !== undefined) {
      console.log(`📌 Found RPSF element, RetailPrice=${styleInfo.retailPrice}`);
      
      const supplierVals = rpsfElement.supplierValues || [];
      let foundCount = 0;
      
      for (const unlockedSupplier of unlockedSuppliers) {
        const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === unlockedSupplier.id);
        
        if (targetVal) {
          result.supplierValues.push({
            Id: targetVal.Id,
            Value: Math.round(styleInfo.retailPrice * 100) / 100, // Round to 2 decimals
            elementCode: 'RPSF',
            supplierId: unlockedSupplier.id
          });
          foundCount++;
        }
      }
      
      console.log(`✅ RPSF: Value=${styleInfo.retailPrice}, Found ${foundCount}/${unlockedSuppliers.length} supplier values`);
    } else {
      console.log(`ℹ️  RPSF element not found or RetailPrice is null (skipping)`);
    }

    // ===== GET GKUR VALUE (used by FOB and Extended Fields) =====
    const gkurValue = (decisionValues && decisionValues.HesaplamaKuru) || 48; // Default GKUR=48

    // ===== PROCESS FOB (NumericValue2 × GKUR) =====
    console.log('\n📦 Processing FOB (MerchHedef × GKUR)...');
    
    const fobElement = styleCostElements.find(elem => elem.code === 'FOB');
    
    if (fobElement && styleInfo.numericValue2 !== null && styleInfo.numericValue2 !== undefined) {
      console.log(`📌 Found FOB element, NumericValue2=${styleInfo.numericValue2}, GKUR=${gkurValue}`);
      
      const fobValue = Math.round((styleInfo.numericValue2 * gkurValue) * 100) / 100; // Round to 2 decimals
      const supplierVals = fobElement.supplierValues || [];
      let foundCount = 0;
      
      for (const unlockedSupplier of unlockedSuppliers) {
        const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === unlockedSupplier.id);
        
        if (targetVal) {
          result.supplierValues.push({
            Id: targetVal.Id,
            Value: Math.round(fobValue * 100) / 100, // Round to 2 decimals
            elementCode: 'FOB',
            supplierId: unlockedSupplier.id
          });
          foundCount++;
        }
      }
      
      console.log(`✅ FOB: Value=${fobValue} (${styleInfo.numericValue2} × ${gkurValue}), Found ${foundCount}/${unlockedSuppliers.length} supplier values`);
    } else {
      console.log(`ℹ️  FOB element not found or NumericValue2 is null (skipping)`);
    }

    // ===== CALCULATE TYPE=3 (CALCULATED) ELEMENTS =====
    console.log('\n🧮 Calculating Type=3 (Calculated) Elements...');
    
    // Build override values map with all Type=1 values we've set
    const overrideValues = new Map();
    
    // Add decision table values
    if (decisionValues) {
      overrideValues.set('SPSF', decisionValues.SegmentPSF || 0);
      overrideValues.set('MU', decisionValues.MU || 0);
      overrideValues.set('KHDF', decisionValues.KumaşHedefMaliyet || 0);
      overrideValues.set('ALMTRY', decisionValues.AlımFiyatı_TRY || 0);
      overrideValues.set('GKUR', decisionValues.HesaplamaKuru || 0);
      overrideValues.set('KDV', decisionValues.KDV || 0);
    }
    
    // Add VRG and NAVL (these depend on CountryId, use first supplier's value)
    // For formula calculation, we'll use a representative value
    if (unlockedSuppliers.length > 0) {
      const firstSupplier = unlockedSuppliers[0];
      const vrgValue = firstSupplier.countryId === 69 ? 1 : 1.38;
      const navlValue = firstSupplier.countryId === 69 ? 1 : 1.08;
      overrideValues.set('VRG', vrgValue);
      overrideValues.set('NAVL', navlValue);
    }
    
    // Add RPSF if available
    if (styleInfo.retailPrice !== null && styleInfo.retailPrice !== undefined) {
      overrideValues.set('RPSF', styleInfo.retailPrice);
      console.log(`   ℹ️  Added RPSF to formula values: ${styleInfo.retailPrice}`);
    }
    
    // Add FOB if available
    if (styleInfo.numericValue2 !== null && styleInfo.numericValue2 !== undefined) {
      const fobValue = styleInfo.numericValue2 * gkurValue;
      overrideValues.set('FOB', fobValue);
      console.log(`   ℹ️  Added FOB to formula values: ${fobValue}`);
    }
    
    console.log(`   📊 Override values prepared: ${overrideValues.size} values`);
    
    // Calculate all formulas with override values
    const calculatedValues = calculateAllFormulas(styleCostElements, overrideValues);
    
    // Add Type=3 calculated values to result
    const type3Elements = styleCostElements.filter(elem => elem.type === 3 && elem.formula);
    
    for (const element of type3Elements) {
      // Get calculated value
      let calculatedValue = calculatedValues.get(element.code) || 0;
      
      // Round to 2 decimal places
      calculatedValue = Math.round(calculatedValue * 100) / 100;
      
      // Find supplier values for ALL UNLOCKED suppliers
      const supplierVals = element.supplierValues || [];
      
      let foundCount = 0;
      for (const unlockedSupplier of unlockedSuppliers) {
        const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === unlockedSupplier.id);
        
        if (targetVal) {
          // Add to supplierValues array for PATCH
          result.supplierValues.push({
            Id: targetVal.Id,
            Value: calculatedValue,
            elementCode: element.code,
            supplierId: unlockedSupplier.id
          });
          foundCount++;
        }
      }
      
      console.log(`   ✅ ${element.code} (Type=3): Calculated=${calculatedValue.toFixed(2)}, Found ${foundCount}/${unlockedSuppliers.length} supplier values`);
    }

    // ===== CALCULATE NEW EXTENDED FIELDS =====
    console.log('\n📝 Calculating Additional Extended Fields...');
    
    // Get RHDF value (from calculated Type=3 values)
    const rhdfValue = calculatedValues.get('RHDF') || 0;
    
    if (rhdfValue > 0 && gkurValue > 0) {
      // AlımTarget_USD = RHDF / GKUR
      const alimTargetUSD = Math.round((rhdfValue / gkurValue) * 100) / 100; // Round to 2 decimals
      
      // Find the extended field for AlımTarget_USD
      const alimTargetExtField = styleExtendedFieldValues.find(
        ef => ef.extFldId === extendedFieldMapping['AlımTarget_USD']
      );
      
      if (alimTargetExtField) {
        result[`AlımTarget_USD_extid`] = alimTargetExtField.id;
        result[`AlımTarget_USD_extvalue`] = alimTargetUSD;
        console.log(`✅ AlımTarget_USD: ${alimTargetUSD.toFixed(2)} (RHDF=${rhdfValue.toFixed(2)} / GKUR=${gkurValue})`);
      } else {
        console.log(`ℹ️  AlımTarget_USD extended field not found (skipping)`);
      }
      
      // AlımTarget_USD_105 = (RHDF / GKUR) / 1.05
      const alimTargetUSD105 = Math.round((alimTargetUSD / 1.05) * 100) / 100; // Round to 2 decimals
      
      const alimTarget105ExtField = styleExtendedFieldValues.find(
        ef => ef.extFldId === extendedFieldMapping['AlımTarget_USD_105']
      );
      
      if (alimTarget105ExtField) {
        result[`AlımTarget_USD_105_extid`] = alimTarget105ExtField.id;
        result[`AlımTarget_USD_105_extvalue`] = alimTargetUSD105;
        console.log(`✅ AlımTarget_USD_105: ${alimTargetUSD105.toFixed(2)} (${alimTargetUSD.toFixed(2)} / 1.05)`);
      } else {
        console.log(`ℹ️  AlımTarget_USD_105 extended field not found (skipping)`);
      }
    } else {
      console.log(`ℹ️  Cannot calculate new extended fields (RHDF=${rhdfValue}, GKUR=${gkurValue})`);
    }
    
    // ===== MAP TYPE=3 COST ELEMENTS TO EXTENDED FIELDS =====
    console.log('\n📋 Mapping Type=3 Cost Elements to Extended Fields...');
    
    for (const [elementCode, extFldId] of Object.entries(type3ToExtFieldMapping)) {
      // Get calculated value for this element
      const calculatedValue = calculatedValues.get(elementCode) || 0;
      const roundedValue = Math.round(calculatedValue * 100) / 100;
      
      // Find the extended field
      const extField = styleExtendedFieldValues.find(ef => ef.extFldId === extFldId);
      
      if (extField) {
        // Add to result with dynamic key names
        result[`${elementCode}_extid`] = extField.id;
        result[`${elementCode}_extvalue`] = roundedValue;
        console.log(`✅ ${elementCode} → Extended Field: Id=${extField.id}, Value=${roundedValue.toFixed(2)}`);
      } else {
        console.log(`ℹ️  Extended Field for ${elementCode} not found (skipping)`);
      }
    }

    console.log('\n✅ Costing calculation completed for StyleId:', styleId);
    return result;

  } catch (error) {
    console.error('❌ Error in processStyleToSegmentPSF:', error.message);
    throw error;
  }
}

/**
 * Process Style BOO to Costing
 * Similar to processStyleToSegmentPSF but uses BOO operation costs
 * Special logic: Code="1" operation → SupplierId=2, Other operations → Other suppliers
 * @param {Object} styleData - Parsed style data with BOO
 * @returns {Object} Calculated costing data for PATCH
 */
function processBooToCosting(styleData) {
  try {
    console.log('\n📊 ===== BOO TO COSTING CALCULATION =====');
    
    // Extract basic style info
    const styleInfo = styleData.styleInfo;
    const styleId = styleInfo.styleId;
    const styleCode = styleInfo.styleCode;
    const brandId = styleInfo.brandId;
    const subCategoryId = styleInfo.subCategoryId;
    const udf5Id = styleInfo.userDefinedField5Id;

    if (!styleId || !styleCode || !brandId || !subCategoryId || !udf5Id) {
      throw new Error('Missing required fields: StyleId, StyleCode, BrandId, SubCategoryId, or UserDefinedField5Id');
    }

    console.log(`📋 Style Info: ID=${styleId}, Code=${styleCode}, Brand=${brandId}, SubCategory=${subCategoryId}, UDF5=${udf5Id}`);

    // Extract Cluster from first colorway's FreeFieldOne
    const styleColorways = styleData.colorways || [];
    if (!styleColorways || styleColorways.length === 0) {
      throw new Error('No StyleColorways found');
    }

    const cluster = styleColorways[0].freeFieldOne;
    if (!cluster) {
      throw new Error('Cluster (FreeFieldOne) not found in first StyleColorway');
    }

    console.log(`🎯 Cluster: ${cluster}`);

    // Calculate BOO operation costs with special logic
    let code1Cost = 0;  // For SupplierId=2 (Hedef Maliyet)
    let otherOperationsCost = 0;  // For other suppliers
    
    if (styleData.boo && styleData.boo.operations) {
      console.log(`📊 Processing ${styleData.boo.operations.length} BOO operations...`);
      
      for (const operation of styleData.boo.operations) {
        const cost = operation.cost || 0;
        const code = operation.code;
        
        if (code === '1') {
          code1Cost += cost;
          console.log(`   📌 Code="1" operation: Cost=${cost} (for SupplierId=2)`);
        } else {
          otherOperationsCost += cost;
          console.log(`   📌 Code="${code}" operation: Cost=${cost} (for other suppliers)`);
        }
      }
      
      // Round to 2 decimals
      code1Cost = Math.round(code1Cost * 100) / 100;
      otherOperationsCost = Math.round(otherOperationsCost * 100) / 100;
      
      console.log(`✅ Code="1" Cost (SupplierId=2): ${code1Cost}`);
      console.log(`✅ Other Operations Cost (Others): ${otherOperationsCost}`);
    } else {
      console.log('⚠️  No BOO operations found, costs = 0');
    }

    // Get StyleCosting
    const styleCosting = styleData.costing;
    if (!styleCosting) {
      throw new Error('StyleCosting not found');
    }

    // Find all UNLOCKED suppliers and categorize them
    const styleCostSuppliers = styleData.costSuppliers || [];
    const unlockedSuppliers = styleCostSuppliers.filter(supplier => !supplier.isLock);
    
    // Separate suppliers by SupplierId
    const supplier2 = unlockedSuppliers.find(s => s.supplierInfo?.supplierId === 2);
    const otherSuppliers = unlockedSuppliers.filter(s => s.supplierInfo?.supplierId !== 2);
    
    console.log(`🔓 Unlocked Suppliers: ${unlockedSuppliers.length}`);
    
    if (supplier2) {
      console.log(`   ⭐ SupplierId=2: Code="${supplier2.supplierInfo.code}", Name="${supplier2.supplierInfo.supplierName}", Id=${supplier2.id}`);
    }
    
    otherSuppliers.forEach((supplier, index) => {
      const supplierInfo = supplier.supplierInfo;
      if (supplierInfo) {
        console.log(`   ${index + 1}. SupplierId=${supplierInfo.supplierId}, Code="${supplierInfo.code}", Name="${supplierInfo.supplierName}", Id=${supplier.id}`);
      }
    });

    if (unlockedSuppliers.length === 0) {
      throw new Error("No unlocked suppliers found in StyleCostSuppliers");
    }

    console.log(`✅ Will write data for ${unlockedSuppliers.length} unlocked suppliers`);

    // Find decision values from decision table (for other Type=1 elements)
    const decisionValues = findDecisionValues(brandId, subCategoryId, udf5Id, cluster);
    
    if (!decisionValues) {
      throw new Error(`No matching decision table entry found for BrandId=${brandId}, SubCategoryId=${subCategoryId}, UDF5Id=${udf5Id}, Cluster=${cluster}`);
    }

    console.log(`✅ Decision values found: {
  BrandId: ${decisionValues.BrandId},
  SubCategoryId: ${decisionValues.SubCategoryId},
  UDF5Id: ${decisionValues.UDF5Id},
  Cluster: '${decisionValues.Cluster}'
}`);

    // Get GKUR from decision values
    const gkurValue = (decisionValues && decisionValues.HesaplamaKuru) || 48;

    // Extended Field ID mapping
    const extendedFieldMapping = {
      'AlımFiyatı_USD': 'daa197bf-717f-4374-9b0c-5a19b8cb2f3a',
      'SegmentPSF': 'b63395db-8252-4b69-b0bd-6506738081b6',
      'KumaşHedefMaliyet': '45247062-689a-48ca-a4e3-79324c8cbab3',
      'AlımFiyatı_TRY': '79cb5b20-3028-44d4-a85e-ed18c00af3c8',
      'AlımTarget_USD': '93fa0034-ea93-4649-a2b1-43b905d01a49',
      'AlımTarget_USD_105': 'b3eeb0c5-f089-441c-a3ff-bfd5697ba30f'
    };
    
    // Type=3 Cost Element to Extended Field mapping
    const type3ToExtFieldMapping = {
      'TKMS': '14a52574-591e-4082-83e7-6a401808b726',
      'TAST': 'c645f6f2-d537-4234-87c1-7675677ffb86',
      'TISC': 'a28b4eca-999c-4437-bb49-7fda0284993c',
      'TTRM': '556a9af5-6350-4bce-ae83-f1453ec3659b',
      'TISL': '40ea5b12-832b-41e9-aefb-e547d1e6884b',
      'TDGR': 'bc11923a-8594-4f22-b2bb-ab7f5f558ba7'
    };

    const result = {
      StyleId: styleId,
      StyleCode: styleCode,
      BrandId: brandId,
      SubCategoryId: subCategoryId,
      UserDefinedField5Id: udf5Id,
      Cluster: cluster,
      supplierValues: []
    };

    const styleCostElements = styleData.costElements || [];
    console.log(`📋 Total Cost Elements: ${styleCostElements.length}`);

    // ===== WRITE AISC (BOO Cost with Special Logic) =====
    console.log('\n🏭 Processing AISC (BOO Cost)...');
    const aiscElement = styleCostElements.find(elem => elem.code === 'AISC');
    
    if (aiscElement) {
      console.log(`📌 Found AISC element: Type=${aiscElement.type}, Name=${aiscElement.name}`);
      const supplierVals = aiscElement.supplierValues || [];
      
      let foundCount = 0;
      
      // Write Code="1" cost to SupplierId=2
      if (supplier2) {
        const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === supplier2.id);
        if (targetVal) {
          result.supplierValues.push({
            Id: targetVal.Id,
            Value: code1Cost,
            elementCode: 'AISC',
            supplierId: supplier2.id
          });
          foundCount++;
          console.log(`   ✅ SupplierId=2: AISC=${code1Cost} (Code="1" operation)`);
        }
      }
      
      // Write other operations cost to other suppliers
      for (const otherSupplier of otherSuppliers) {
        const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === otherSupplier.id);
        if (targetVal) {
          result.supplierValues.push({
            Id: targetVal.Id,
            Value: otherOperationsCost,
            elementCode: 'AISC',
            supplierId: otherSupplier.id
          });
          foundCount++;
          console.log(`   ✅ SupplierId=${otherSupplier.supplierInfo.supplierId}: AISC=${otherOperationsCost} (Other operations)`);
        }
      }
      
      console.log(`✅ AISC: Found ${foundCount}/${unlockedSuppliers.length} supplier values`);
    } else {
      console.warn(`⚠️  AISC cost element not found (skipping)`);
    }

    // ===== CALCULATE TYPE=3 ELEMENTS PER SUPPLIER =====
    console.log('\n🧮 Calculating Type=3 (Calculated) Elements per supplier...');
    
    const type3Elements = styleCostElements.filter(elem => elem.type === 3 && elem.formula);
    
    // Calculate for each supplier with their specific AISC value
    for (const unlockedSupplier of unlockedSuppliers) {
      const supplierId = unlockedSupplier.supplierInfo?.supplierId;
      const isSupplier2 = supplierId === 2;
      const supplierAISC = isSupplier2 ? code1Cost : otherOperationsCost;
      
      console.log(`\n   📊 Calculating for Supplier ${supplierId} (AISC=${supplierAISC})...`);
      
      // Build override values for this supplier
      const overrideValues = new Map();
      
      // Add AISC specific to this supplier
      overrideValues.set('AISC', supplierAISC);
      
      // Add decision table values
      if (decisionValues) {
        overrideValues.set('SPSF', decisionValues.SegmentPSF || 0);
        overrideValues.set('MU', decisionValues.MU || 0);
        overrideValues.set('KHDF', decisionValues.KumaşHedefMaliyet || 0);
        overrideValues.set('ALMTRY', decisionValues.AlımFiyatı_TRY || 0);
        overrideValues.set('GKUR', decisionValues.HesaplamaKuru || 0);
        overrideValues.set('KDV', decisionValues.KDV || 0);
      }
      
      // Add VRG and NAVL for this supplier
      const vrgValue = unlockedSupplier.countryId === 69 ? 1 : 1.38;
      const navlValue = unlockedSupplier.countryId === 69 ? 1 : 1.08;
      overrideValues.set('VRG', vrgValue);
      overrideValues.set('NAVL', navlValue);
      
      // Add RPSF if available
      if (styleInfo.retailPrice !== null && styleInfo.retailPrice !== undefined) {
        overrideValues.set('RPSF', styleInfo.retailPrice);
      }
      
      // Add FOB if available
      if (styleInfo.numericValue2 !== null && styleInfo.numericValue2 !== undefined) {
        const fobValue = Math.round((styleInfo.numericValue2 * gkurValue) * 100) / 100;
        overrideValues.set('FOB', fobValue);
      }
      
      // Calculate Type=3 for this supplier
      const calculatedValues = calculateAllFormulas(styleCostElements, overrideValues);
      
      // Store results for this supplier
      for (const element of type3Elements) {
        let calculatedValue = calculatedValues.get(element.code) || 0;
        calculatedValue = Math.round(calculatedValue * 100) / 100;
        
        const supplierVals = element.supplierValues || [];
        const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === unlockedSupplier.id);
        
        if (targetVal) {
          result.supplierValues.push({
            Id: targetVal.Id,
            Value: calculatedValue,
            elementCode: element.code,
            supplierId: unlockedSupplier.id
          });
          
          console.log(`      ${element.code}: ${calculatedValue.toFixed(2)}`);
        }
      }
      
      // Store calculated values for SupplierId=2 for extended fields
      if (isSupplier2) {
        result.supplier2CalculatedValues = calculatedValues;
      }
    }

    // ===== EXTENDED FIELDS (Using SupplierId=2 values) =====
    console.log('\n📝 Processing Extended Fields (using SupplierId=2 values)...');
    
    const styleExtendedFieldValues = styleData.extendedFields || [];
    const supplier2CalcValues = result.supplier2CalculatedValues || new Map();

    // 1. Decision table extended fields
    for (const [decisionKey, extFldId] of Object.entries(extendedFieldMapping)) {
      let decisionValue = 0;
      if (decisionValues && decisionValues[decisionKey] !== undefined) {
        decisionValue = decisionValues[decisionKey];
      }
      decisionValue = Math.round(decisionValue * 100) / 100;

      const extField = styleExtendedFieldValues.find(ef => ef.extFldId === extFldId);
      if (extField) {
        result[`${decisionKey}_extid`] = extField.id;
        result[`${decisionKey}_extvalue`] = decisionValue;
        console.log(`✅ Extended Field ${decisionKey}: Id=${extField.id}, Value=${decisionValue}`);
      }
    }

    // 2. RHDF-based extended fields (using Supplier 2 RHDF)
    const rhdfValue = supplier2CalcValues.get('RHDF') || 0;
    if (rhdfValue > 0 && gkurValue > 0) {
      const alimTargetUSD = Math.round((rhdfValue / gkurValue) * 100) / 100;
      
      const alimTargetExtField = styleExtendedFieldValues.find(
        ef => ef.extFldId === extendedFieldMapping['AlımTarget_USD']
      );
      if (alimTargetExtField) {
        result[`AlımTarget_USD_extid`] = alimTargetExtField.id;
        result[`AlımTarget_USD_extvalue`] = alimTargetUSD;
        console.log(`✅ AlımTarget_USD: ${alimTargetUSD.toFixed(2)} (Supplier 2 RHDF=${rhdfValue.toFixed(2)})`);
      }
      
      const alimTargetUSD105 = Math.round((alimTargetUSD / 1.05) * 100) / 100;
      const alimTarget105ExtField = styleExtendedFieldValues.find(
        ef => ef.extFldId === extendedFieldMapping['AlımTarget_USD_105']
      );
      if (alimTarget105ExtField) {
        result[`AlımTarget_USD_105_extid`] = alimTarget105ExtField.id;
        result[`AlımTarget_USD_105_extvalue`] = alimTargetUSD105;
        console.log(`✅ AlımTarget_USD_105: ${alimTargetUSD105.toFixed(2)}`);
      }
    }
    
    // 3. Type=3 to Extended Field mapping (using Supplier 2 values)
    for (const [elementCode, extFldId] of Object.entries(type3ToExtFieldMapping)) {
      const calculatedValue = supplier2CalcValues.get(elementCode) || 0;
      const roundedValue = Math.round(calculatedValue * 100) / 100;
      
      const extField = styleExtendedFieldValues.find(ef => ef.extFldId === extFldId);
      if (extField) {
        result[`${elementCode}_extid`] = extField.id;
        result[`${elementCode}_extvalue`] = roundedValue;
        console.log(`✅ ${elementCode} → Extended Field: Id=${extField.id}, Value=${roundedValue.toFixed(2)} (Supplier 2)`);
      }
    }
    
    // Clean up temporary field
    delete result.supplier2CalculatedValues;

    console.log('\n✅ BOO Costing calculation completed for StyleId:', styleId);
    return result;

  } catch (error) {
    console.error('❌ Error in processBooToCosting:', error.message);
    throw error;
  }
}

module.exports = {
  processStyleToSegmentPSF,
  processBooToCosting
};
