/**
 * Test for REVISED BOM workflow
 * Test Date: 2026-01-16
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000/api/workflow/process';

// Test payload for BOM workflow
const testPayload = {
  workflowdefination: "UPDATED_STYLE_BOM",
  moduleId: "10600"
};

async function testRevisedBom() {
  try {
    console.log('🧪 Testing REVISED BOM Workflow...\n');
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

testRevisedBom();
