/**
 * Test for BOM_TO_COSTING workflow with StyleId 11457
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000/api/workflow/process';

const testPayload = {
  workflowdefination: "UPDATED_STYLE_BOM",
  moduleId: "11457"
};

async function testBom() {
  try {
    console.log('🧪 Testing BOM TO COSTING Workflow...\n');
    console.log('📦 Payload:', JSON.stringify(testPayload, null, 2));
    console.log('\n🚀 Sending request...\n');

    const response = await axios.post(API_URL, testPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Response Status:', response.status);
    console.log('📄 Response Data:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testBom();
