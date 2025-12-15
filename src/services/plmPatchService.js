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
    const payload = [
      {
        Id: { IonApiRef: '$.SPSFId' },
        Value: { IonApiRef: '$.SPSFValue' }
      },
      {
        Id: { IonApiRef: '$.MUId' },
        Value: { IonApiRef: '$.MUValue' }
      },
      {
        Id: { IonApiRef: '$.KHDFId' },
        Value: { IonApiRef: '$.KHDFValue' }
      },
      {
        Id: { IonApiRef: '$.ALMTRYId' },
        Value: { IonApiRef: '$.ALMTRYValue' }
      }
    ];

    return payload;
  }

  /**
   * Build PATCH payload for StyleExtendedFieldValues
   * @param {Object} calculatedData - Calculated costing data
   * @returns {Array} Payload array for PATCH request
   */
  buildStyleExtendedFieldValuesPayload(calculatedData) {
    const payload = [
      {
        Id: { IonApiRef: '$.SPSF_extid' },
        NumberValue: { IonApiRef: '$.SPSFValue' }
      },
      {
        Id: { IonApiRef: '$.MU_extid' },
        NumberValue: { IonApiRef: '$.MUValue' }
      },
      {
        Id: { IonApiRef: '$.KHDF_extid' },
        NumberValue: { IonApiRef: '$.KHDFValue' }
      },
      {
        Id: { IonApiRef: '$.ALMUSD_extid' },
        NumberValue: { IonApiRef: '$.ALMUSDValue' }
      },
      {
        Id: { IonApiRef: '$.ALMTRY_extid' },
        NumberValue: { IonApiRef: '$.ALMTRYValue' }
      }
    ];

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
      console.log('📋 Calculated Data:', JSON.stringify(calculatedData, null, 2));
      console.log('📋 Payload (with IonApiRef):', JSON.stringify(payload, null, 2));

      // Get access token
      const authHeader = await tokenService.getAuthorizationHeader();

      const response = await axios.patch(url, calculatedData, {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Infor-MongoQuery': JSON.stringify(payload)
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
      console.log('📋 Calculated Data:', JSON.stringify(calculatedData, null, 2));
      console.log('📋 Payload (with IonApiRef):', JSON.stringify(payload, null, 2));

      // Get access token
      const authHeader = await tokenService.getAuthorizationHeader();

      const response = await axios.patch(url, calculatedData, {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Infor-MongoQuery': JSON.stringify(payload)
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

