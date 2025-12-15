const { findDecisionValues } = require('../config/decisionTable');

/**
 * Costing Calculation Service
 * Converts style costing data to segment PSF format
 */

/**
 * Process style costing data and calculate values from decision table
 * @param {Object} styleData - Style costing data from PLM API
 * @returns {Object} Processed costing data with calculated values
 */
function processStyleToSegmentPSF(styleData) {
  try {
    // Extract basic style information
    const styleId = styleData.StyleId;
    const styleCode = styleData.StyleCode;
    const brandId = styleData.BrandId;
    const subCategoryId = styleData.SubCategoryId;
    const udf5Id = styleData.UserDefinedField5Id;

    if (!styleId || !styleCode || !brandId || !subCategoryId || !udf5Id) {
      throw new Error('Missing required fields: StyleId, StyleCode, BrandId, SubCategoryId, or UserDefinedField5Id');
    }

    // Get Cluster from StyleColorways (FreeFieldOne)
    let cluster = null;
    if (styleData.StyleColorways && styleData.StyleColorways.length > 0) {
      cluster = styleData.StyleColorways[0].FreeFieldOne;
    }

    if (!cluster) {
      throw new Error('Cluster not found in StyleColorways (FreeFieldOne)');
    }

    console.log(`📊 Processing: BrandId=${brandId}, SubCategoryId=${subCategoryId}, UDF5Id=${udf5Id}, Cluster=${cluster}`);

    // Get StyleCosting
    if (!styleData.StyleCosting || styleData.StyleCosting.length === 0) {
      throw new Error('No StyleCosting found in input');
    }

    const styleCosting = styleData.StyleCosting[0];

    // Find "Hedef Maliyet" supplier
    const styleCostSuppliers = styleCosting.StyleCostSuppliers || [];
    let hedefMaliyetSupplierId = null;

    for (const supplier of styleCostSuppliers) {
      const styleSupplier = supplier.StyleSupplier || {};
      const supplierName = styleSupplier.SupplierName || '';
      if (supplierName === 'Hedef Maliyet') {
        hedefMaliyetSupplierId = supplier.Id;
        break;
      }
    }

    if (hedefMaliyetSupplierId === null) {
      throw new Error("'Hedef Maliyet' supplier not found in StyleCostSuppliers");
    }

    console.log(`✅ Found Hedef Maliyet Supplier ID: ${hedefMaliyetSupplierId}`);

    // Find decision values from decision table
    const decisionValues = findDecisionValues(brandId, subCategoryId, udf5Id, cluster);
    
    if (!decisionValues) {
      console.warn(`⚠️  No decision values found for BrandId=${brandId}, SubCategoryId=${subCategoryId}, UDF5Id=${udf5Id}, Cluster=${cluster}`);
    } else {
      console.log(`✅ Decision values found:`, decisionValues);
    }

    // Code mapping: Code -> (decision_key, output_key)
    const codeMapping = {
      'SPSF': { decisionKey: 'SegmentPSF', outputKey: 'SPSF' },
      'MU': { decisionKey: 'MU', outputKey: 'MU' },
      'KHDF': { decisionKey: 'KumaşHedefMaliyet', outputKey: 'KHDF' },
      'ALMUSD': { decisionKey: 'AlımFiyatı_USD', outputKey: 'ALMUSD' },
      'ALMTRY': { decisionKey: 'AlımFiyatı_TRY', outputKey: 'ALMTRY' }
    };

    const result = {
      StyleId: styleId,
      StyleCode: styleCode,
      BrandId: brandId,
      SubCategoryId: subCategoryId,
      UserDefinedField5Id: udf5Id,
      Cluster: cluster
    };

    // Get StyleCostElements
    const styleCostElements = styleCosting.StyleCostElements || [];

    // Process each code
    for (const [code, mapping] of Object.entries(codeMapping)) {
      // Find element with this code
      const element = styleCostElements.find(elem => elem.Code === code);

      if (!element) {
        throw new Error(`Element with Code='${code}' not found in StyleCostElements`);
      }

      // Find StyleCostingSupplierVal for "Hedef Maliyet" supplier
      const supplierVals = element.StyleCostingSupplierVals || [];
      const targetVal = supplierVals.find(val => val.StyleCostingSupplierId === hedefMaliyetSupplierId);

      if (!targetVal) {
        throw new Error(`StyleCostingSupplierVal not found for Code='${code}' and StyleCostingSupplierId=${hedefMaliyetSupplierId}`);
      }

      // Get value from decision table (or 0 if not found)
      let decisionValue = 0;
      if (decisionValues && decisionValues[mapping.decisionKey] !== undefined) {
        decisionValue = decisionValues[mapping.decisionKey];
      }

      // Add to result
      result[`${mapping.outputKey}Id`] = targetVal.Id;
      result[`${mapping.outputKey}Value`] = decisionValue;
    }

    // Get Extended Field IDs
    const styleExtendedFieldValues = styleData.StyleExtendedFieldValues || [];

    // Extended field name mapping
    const extFieldMapping = {
      'SegmentPSF': 'SPSF',
      'MarkUp': 'MU',
      'KumasHedefMaliyet': 'KHDF',
      'Alım Fiyatı_USD': 'ALMUSD',
      'Alım Fiyatı_TRY': 'ALMTRY'
    };

    // Find extended field IDs
    for (const extField of styleExtendedFieldValues) {
      const styleExtendedFields = extField.StyleExtendedFields || {};
      const fieldName = styleExtendedFields.Name;

      if (fieldName && extFieldMapping[fieldName]) {
        const outputKey = extFieldMapping[fieldName];
        const extId = extField.Id;
        if (extId !== null && extId !== undefined) {
          result[`${outputKey}_extid`] = extId;
        }
      }
    }

    console.log(`✅ Costing calculation completed for StyleId: ${styleId}`);
    return result;

  } catch (error) {
    console.error('❌ Error in processStyleToSegmentPSF:', error.message);
    throw error;
  }
}

module.exports = {
  processStyleToSegmentPSF
};

