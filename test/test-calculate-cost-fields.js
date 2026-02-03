/**
 * Test for calculate-cost-fields endpoint
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000/api/workflow/calculate-cost-fields';

const testPayload = {
  styleId: "11457"
};

async function testCalculateCostFields() {
  try {
    console.log('🧪 Testing Calculate Cost Fields API...\n');
    console.log('📦 Payload:', JSON.stringify(testPayload, null, 2));
    console.log('\n🚀 Sending request...\n');

    const response = await axios.post(API_URL, testPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Response Status:', response.status);
    console.log('\n📊 Calculated Values:');
    console.log('   Cost5:', response.data.calculated.cost5);
    console.log('   Cost8:', response.data.calculated.cost8);
    console.log('   Cost9:', response.data.calculated.cost9);
    console.log('\n📄 Full Response:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testCalculateCostFields();
