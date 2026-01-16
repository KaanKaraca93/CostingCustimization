/**
 * Test for REVISED BOO workflow
 * Test Date: 2026-01-16
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000/api/workflow/process';

// Test payload for BOO workflow
const testPayload = {
  workflowdefination: "UPDATED_STYLE_BOO",
  moduleId: "10600"
};

async function testRevisedBoo() {
  try {
    console.log('🧪 Testing REVISED BOO Workflow...\n');
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

testRevisedBoo();
