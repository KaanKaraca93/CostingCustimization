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
        const value = calculatedData[field.value];
        
        // Skip if value is 0 (PLM doesn't accept 0 values for extended fields)
        if (value === 0) {
          continue;
        }
        
        payload.push({
          Id: calculatedData[field.id],
          NumberValue: String(value) // Convert to string as PLM expects string
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
      
      // Skip if no extended fields to patch
      if (payload.length === 0) {
        console.log('ℹ️  No extended field values to patch, skipping');
        return { message: 'No extended field values to patch' };
      }
      
      const url = `${this.baseUrl}/STYLEEXTENDEDFIELDVALUES`;

      console.log('📋 PATCH URL:', url);
      console.log(`📋 Patching ${payload.length} extended fields ONE BY ONE...`);

      // Get access token
      const authHeader = await tokenService.getAuthorizationHeader();

      // PLM accepts only ONE extended field at a time, so PATCH one by one
      const results = [];
      for (const field of payload) {
        const singlePayload = [field]; // Wrap in array as PLM expects array format
        
        console.log(`   → Patching Id=${field.Id}, Value=${field.NumberValue}`);
        
        const response = await axios.patch(url, singlePayload, {
          headers: {
            'Authorization': authHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        results.push(response.data);
      }

      console.log(`✅ PATCH StyleExtendedFieldValues successful (${results.length} fields updated)`);
      return results;

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
   * Execute complete PATCH operation (supplier values only - extended fields handled by ION)
   * @param {Object} calculatedData - Calculated costing data
   * @returns {Promise<Object>} Combined results
   */
  async patchCostingData(calculatedData) {
    try {
      console.log('\n💾 Starting PATCH operations...');

      // PATCH supplier values only
      const result1 = await this.patchStyleCostingSupplierValue(calculatedData);
      
      /* ===== EXTENDED FIELDS PATCH - DISABLED (handled by ION) =====
      const result2 = await this.patchStyleExtendedFieldValues(calculatedData);
      ===== END DISABLED ===== */

      console.log('✅ All PATCH operations completed successfully\n');

      return {
        styleCostingSupplierValue: result1
        // styleExtendedFieldValues: result2  // Disabled - handled by ION
      };

    } catch (error) {
      console.error('❌ Error in patchCostingData:', error.message);
      throw error;
    }
  }

  /**
   * PATCH extended field values
   * @param {Array} extendedFieldData - Array of {Id, NumberValue} objects
   * @returns {Object} PATCH result
   */
  async patchExtendedFields(extendedFieldData) {
    try {
      if (!extendedFieldData || extendedFieldData.length === 0) {
        console.warn('⚠️  No extended field data to patch');
        return {
          styleCostingSupplierValue: '',
          styleExtendedFieldValue: '',
          message: 'No data to patch'
        };
      }

      console.log(`\n📤 ====== PATCHING ${extendedFieldData.length} Extended Field Values ======`);

      const token = await tokenService.getAccessToken();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // PATCH StyleExtendedFieldValues (bulk update)
      const extendedFieldUrl = `${this.baseUrl}/STYLEEXTENDEDFIELDVALUES`;
      
      console.log(`📍 URL: ${extendedFieldUrl}`);
      console.log(`📦 Payload (${extendedFieldData.length} items):`, JSON.stringify(extendedFieldData.slice(0, 3), null, 2));

      const extFieldResponse = await axios.patch(extendedFieldUrl, extendedFieldData, { headers });

      console.log(`✅ Extended field PATCH response:`, extFieldResponse.status, extFieldResponse.statusText);

      return {
        styleExtendedFieldValue: extFieldResponse.data || 'Success',
        message: 'Extended fields patched successfully'
      };

    } catch (error) {
      console.error('❌ Error in patchExtendedFields:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      }
      throw error;
    }
  }
}

// Create singleton instance
const plmPatchService = new PLMPatchService();

module.exports = plmPatchService;

