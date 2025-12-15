const axios = require('axios');
const tokenService = require('./tokenService');
const PLM_CONFIG = require('../config/plm.config');

/**
 * PLM PATCH Service
 * Handles PATCH operations to update PLM data
 */
class PLMPatchService {
  constructor() {
    this.baseUrl = `${PLM_CONFIG.ionApiUrl}/${PLM_CONFIG.tenantId}/FASHIONPLM/odata2/api/odata2`;
  }

  /**
   * Build PATCH payload for StyleCostingSupplierValue
   * @param {Object} calculatedData - Calculated costing data
   * @returns {Array} Payload array for PATCH request
   */
  buildStyleCostingSupplierValuePayload(calculatedData) {
    const payload = [];

    // Use the supplierValues array if available (multi-supplier support)
    if (calculatedData.supplierValues && Array.isArray(calculatedData.supplierValues)) {
      for (const supplierValue of calculatedData.supplierValues) {
        payload.push({
          Id: supplierValue.Id,
          Value: supplierValue.Value
        });
      }
      
      console.log(`📊 Payload built for ${payload.length} supplier values`);
      return payload;
    }

    // Fallback: Old method (for backward compatibility)
    for (const key in calculatedData) {
      if (key.endsWith('Id') && key !== 'StyleId' && key !== 'BrandId' && 
          key !== 'SubCategoryId' && key !== 'UserDefinedField5Id') {
        
        const valueKey = key.replace('Id', 'Value');
        
        if (calculatedData[valueKey] !== undefined) {
          payload.push({
            Id: calculatedData[key],
            Value: calculatedData[valueKey]
          });
        }
      }
    }

    return payload;
  }

  /**
   * Build PATCH payload for StyleExtendedFieldValues
   * @param {Object} calculatedData - Calculated costing data
   * @returns {Array} Payload array for PATCH request
   */
  buildStyleExtendedFieldValuesPayload(calculatedData) {
    const payload = [];

    // Direct array format: [{ "Id": 195840, "NumberValue": 2349 }, ...]
    const extFieldMapping = [
      { id: 'AlımFiyatı_USD_extid', value: 'AlımFiyatı_USD_extvalue' },
      { id: 'SegmentPSF_extid', value: 'SegmentPSF_extvalue' },
      { id: 'KumaşHedefMaliyet_extid', value: 'KumaşHedefMaliyet_extvalue' },
      { id: 'AlımFiyatı_TRY_extid', value: 'AlımFiyatı_TRY_extvalue' },
      { id: 'AlımTarget_USD_extid', value: 'AlımTarget_USD_extvalue' },
      { id: 'AlımTarget_USD_105_extid', value: 'AlımTarget_USD_105_extvalue' },
      // Type=3 Cost Elements mapped to Extended Fields
      { id: 'TKMS_extid', value: 'TKMS_extvalue' },
      { id: 'TAST_extid', value: 'TAST_extvalue' },
      { id: 'TISC_extid', value: 'TISC_extvalue' },
      { id: 'TTRM_extid', value: 'TTRM_extvalue' },
      { id: 'TISL_extid', value: 'TISL_extvalue' },
      { id: 'TDGR_extid', value: 'TDGR_extvalue' }
    ];

    for (const field of extFieldMapping) {
      if (calculatedData[field.id] !== undefined && calculatedData[field.value] !== undefined) {
        payload.push({
          Id: calculatedData[field.id],
          NumberValue: calculatedData[field.value]
        });
      }
    }

    return payload;
  }

  /**
   * PATCH StyleCostingSupplierValue
   * @param {Object} calculatedData - Calculated costing data
   * @returns {Promise<Object>} Response from PLM
   */
  async patchStyleCostingSupplierValue(calculatedData) {
    try {
      console.log('📤 PATCH StyleCostingSupplierValue...');

      const payload = this.buildStyleCostingSupplierValuePayload(calculatedData);
      const url = `${this.baseUrl}/STYLECOSTINGSUPPLIERVALUE`;

      console.log('📋 PATCH URL:', url);
      console.log('📋 Payload:', JSON.stringify(payload, null, 2));

      // Get access token
      const authHeader = await tokenService.getAuthorizationHeader();

      // Body is the payload array directly, no X-Infor-MongoQuery needed
      const response = await axios.patch(url, payload, {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ PATCH StyleCostingSupplierValue successful');
      return response.data;

    } catch (error) {
      console.error('❌ Error in patchStyleCostingSupplierValue:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      }
      throw error;
    }
  }

  /**
   * PATCH StyleExtendedFieldValues
   * @param {Object} calculatedData - Calculated costing data
   * @returns {Promise<Object>} Response from PLM
   */
  async patchStyleExtendedFieldValues(calculatedData) {
    try {
      console.log('📤 PATCH StyleExtendedFieldValues...');

      const payload = this.buildStyleExtendedFieldValuesPayload(calculatedData);
      const url = `${this.baseUrl}/STYLEEXTENDEDFIELDVALUES`;

      console.log('📋 PATCH URL:', url);
      console.log('📋 Payload:', JSON.stringify(payload, null, 2));

      // Get access token
      const authHeader = await tokenService.getAuthorizationHeader();

      // Body is the payload array directly, no X-Infor-MongoQuery needed
      const response = await axios.patch(url, payload, {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ PATCH StyleExtendedFieldValues successful');
      return response.data;

    } catch (error) {
      console.error('❌ Error in patchStyleExtendedFieldValues:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      }
      throw error;
    }
  }

  /**
   * Execute complete PATCH operation (both endpoints)
   * @param {Object} calculatedData - Calculated costing data
   * @returns {Promise<Object>} Combined results
   */
  async patchCostingData(calculatedData) {
    try {
      console.log('\n💾 Starting PATCH operations...');

      // PATCH both endpoints sequentially
      const result1 = await this.patchStyleCostingSupplierValue(calculatedData);
      const result2 = await this.patchStyleExtendedFieldValues(calculatedData);

      console.log('✅ All PATCH operations completed successfully\n');

      return {
        styleCostingSupplierValue: result1,
        styleExtendedFieldValues: result2
      };

    } catch (error) {
      console.error('❌ Error in patchCostingData:', error.message);
      throw error;
    }
  }
}

// Create singleton instance
const plmPatchService = new PLMPatchService();

module.exports = plmPatchService;

