/**
 * Test BOO workflow WITHOUT decisionTableValues
 * Should work fine as decisionTableValues is optional
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000/api/workflow/process';

// Test payload WITHOUT decisionTableValues
const testPayload = {
  workflowdefination: "UPDATED_STYLE_BOO",
  moduleId: "10596"
  // NO decisionTableValues - should be optional
};

async function testBooWithoutDecision() {
  try {
    console.log('🧪 Testing BOO Workflow WITHOUT decisionTableValues...\n');
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
  }
}

testBooWithoutDecision();
