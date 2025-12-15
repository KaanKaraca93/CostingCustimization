const axios = require('axios');
const tokenService = require('./tokenService');
const PLM_CONFIG = require('../config/plm.config');

/**
 * PLM API Service
 * Handles all PLM/ION API requests
 */
class PLMService {
  constructor() {
    this.baseUrl = `${PLM_CONFIG.ionApiUrl}/${PLM_CONFIG.tenantId}/FASHIONPLM/odata2/api/odata2`;
  }

  /**
   * Get Style Costing data by StyleId
   * @param {string|number} styleId - Style ID (ModuleId from XML)
   * @returns {Promise<Object>} Style costing data
   */
  async getStyleCosting(styleId) {
    try {
      console.log(`📥 Fetching style costing data for StyleId: ${styleId}`);

      // Get access token
      const authHeader = await tokenService.getAuthorizationHeader();

      // Build the complex OData query
      const query = this.buildStyleCostingQuery(styleId);
      const url = `${this.baseUrl}/STYLE${query}`;

      console.log('🔗 Request URL:', url);

      const response = await axios.get(url, {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.value && response.data.value.length > 0) {
        console.log('✅ Style costing data retrieved successfully');
        return response.data.value[0]; // Return first result
      } else {
        console.log('⚠️  No data found for StyleId:', styleId);
        return null;
      }

    } catch (error) {
      console.error('❌ Error fetching style costing:', error.message);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      }
      
      throw new Error(`Failed to fetch style costing: ${error.message}`);
    }
  }

  /**
   * Build OData query for style costing
   * @param {string|number} styleId 
   * @returns {string} OData query string
   */
  buildStyleCostingQuery(styleId) {
    // Complex $expand with nested filters and selects
    const expandQuery = [
      // STYLECOSTING expansion
      'STYLECOSTING(',
        '$expand=',
          // Style Cost Elements (NO FILTER - get all, we'll filter Type=3 in code)
          'STYLECOSTELEMENTS(',
            '$expand=STYLECOSTINGSUPPLIERVALS',
          '),',
          // Style Cost Suppliers (no $select - get all fields including IsLock)
          'STYLECOSTSUPPLIERS(',
            '$expand=STYLESUPPLIER(',
              '$select=Id,SupplierId,Code,SupplierName',
            ')',
          ');',
        '$select=Id,CostModelId,CurrencyId',
      ')',
    ].join('');

    const colorwaysExpand = 'STYLECOLORWAYS($select=Code,Name,FreeFieldOne;$top=1)';
    
    const extendedFieldsExpand = [
      'STYLEEXTENDEDFIELDVALUES(',
        '$select=StyleId,Id,ExtFldId,NumberValue;',
        '$expand=STYLEEXTENDEDFIELDS($select=Name)',
      ')'
    ].join('');

    const select = '$select=StyleId,StyleCode,BrandId,SubCategoryId,UserDefinedField5Id,RetailPrice,NumericValue2';
    const filter = `$filter=StyleId eq ${styleId}`;

    // Combine all parts
    return `?&$expand=${expandQuery},${colorwaysExpand},${extendedFieldsExpand}&${select}&${filter}`;
  }

  /**
   * Parse style costing response and extract relevant data
   * @param {Object} styleData - Raw style data from API
   * @returns {Object} Parsed costing data
   */
  parseStyleCostingData(styleData) {
    if (!styleData) {
      return null;
    }

    const parsed = {
      styleInfo: {
        styleId: styleData.StyleId,
        styleCode: styleData.StyleCode,
        brandId: styleData.BrandId,
        subCategoryId: styleData.SubCategoryId,
        userDefinedField5Id: styleData.UserDefinedField5Id,
        retailPrice: styleData.RetailPrice || null,
        numericValue2: styleData.NumericValue2 || null // MerchHedef
      },
      colorways: [],
      costing: null,
      costElements: [],
      costSuppliers: [],
      extendedFields: []
    };

    // Parse Colorways (field names are PascalCase from OData)
    if (styleData.StyleColorways && styleData.StyleColorways.length > 0) {
      parsed.colorways = styleData.StyleColorways.map(cw => ({
        code: cw.Code,
        name: cw.Name,
        freeFieldOne: cw.FreeFieldOne
      }));
    }

    // Parse Costing (StyleCosting is an array in OData response)
    if (styleData.StyleCosting && styleData.StyleCosting.length > 0) {
      const costing = styleData.StyleCosting[0]; // Take first costing record
      
      parsed.costing = {
        id: costing.Id,
        costModelId: costing.CostModelId,
        currencyId: costing.CurrencyId
      };

      // Parse Cost Elements (include Type and Formula fields)
      if (costing.StyleCostElements) {
        parsed.costElements = costing.StyleCostElements.map(element => ({
          id: element.Id,
          styleCostingId: element.StyleCostingId,
          costLevelId: element.CostLevelId,
          seq: element.Seq,
          code: element.Code,
          name: element.Name,
          value: element.Value,
          type: element.Type, // Type=3 means calculated
          formula: element.Formula || element.Calculation || null, // Formula for Type=3
          supplierValues: element.StyleCostingSupplierVals || []
        }));
      }

      // Parse Cost Suppliers
      if (costing.StyleCostSuppliers) {
        parsed.costSuppliers = costing.StyleCostSuppliers.map(supplier => ({
          id: supplier.Id,
          styleCostingId: supplier.StyleCostingId,
          styleSupplierId: supplier.StyleSupplierId,
          isLock: supplier.IsLock || false, // IsLock field for filtering
          countryId: supplier.CountryId || null, // CountryId for VRG/NAVL calculation
          supplierInfo: supplier.StyleSupplier ? {
            id: supplier.StyleSupplier.Id,
            supplierId: supplier.StyleSupplier.SupplierId,
            code: supplier.StyleSupplier.Code,
            supplierName: supplier.StyleSupplier.SupplierName
          } : null
        }));
      }
    }

    // Parse Extended Fields
    if (styleData.StyleExtendedFieldValues) {
      parsed.extendedFields = styleData.StyleExtendedFieldValues.map(field => ({
        id: field.Id,
        styleId: field.StyleId,
        extFldId: field.ExtFldId,
        numberValue: field.NumberValue,
        fieldName: field.StyleExtendedFields?.Name || null
      }));
    }

    return parsed;
  }

  /**
   * Get and parse style costing data
   * @param {string|number} styleId 
   * @returns {Promise<Object>} Parsed style costing data
   */
  async getAndParseStyleCosting(styleId) {
    const rawData = await this.getStyleCosting(styleId);
    return this.parseStyleCostingData(rawData);
  }
}

// Create singleton instance
const plmService = new PLMService();

module.exports = plmService;

