const plmPatchService = require('../src/services/plmPatchService');

console.log('🧪 Testing PATCH Payload Generation...\n');

// Sample calculated data (mock data for testing)
const sampleCalculatedData = {
  StyleId: 158,
  StyleCode: 'IS1260002101',
  BrandId: 4,
  SubCategoryId: 20,
  UserDefinedField5Id: 1,
  Cluster: '015-D',
  SPSFId: 1295,
  SPSFValue: 2349,
  MUId: 1335,
  MUValue: 3.0,
  KHDFId: 1307,
  KHDFValue: 5,
  ALMUSDId: 1299,
  ALMUSDValue: 14.83,
  ALMTRYId: 1298,
  ALMTRYValue: 711.82,
  SPSF_extid: 195840,
  MU_extid: 195841,
  KHDF_extid: 195843,
  ALMUSD_extid: 195844,
  ALMTRY_extid: 195845
};

console.log('📊 Sample Calculated Data:');
console.log(JSON.stringify(sampleCalculatedData, null, 2));
console.log('\n');

// Test StyleCostingSupplierValue payload
console.log('1️⃣  StyleCostingSupplierValue Payload:');
const payload1 = plmPatchService.buildStyleCostingSupplierValuePayload(sampleCalculatedData);
console.log(JSON.stringify(payload1, null, 2));
console.log('\n');

// Test StyleExtendedFieldValues payload
console.log('2️⃣  StyleExtendedFieldValues Payload:');
const payload2 = plmPatchService.buildStyleExtendedFieldValuesPayload(sampleCalculatedData);
console.log(JSON.stringify(payload2, null, 2));
console.log('\n');

console.log('✅ Payload generation test completed!');
console.log('\n📋 These payloads will be sent as X-Infor-MongoQuery header');
console.log('📋 The calculatedData object will be sent as the request body');

