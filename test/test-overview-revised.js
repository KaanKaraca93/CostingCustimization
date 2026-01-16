/**
 * Test for REVISED OVERVIEW workflow with decision table values from input
 * Test Date: 2026-01-16
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000/api/workflow/process';

// Test payload with decision table values
const testPayload = {
  workflowdefination: "UPDATED_STYLE_OVERVIEW",
  moduleId: "10596",
  decisionTableValues: {
    SegmentPSF: 2349,
    MU: 1.4,
    KumaşHedefMaliyet: 120.5,
    AlımFiyatı_TRY: 1150,
    AlımFiyatı_USD: 95.5,
    HesaplamaKuru: 48,
    KDV: 0.10
  }
};

async function testRevisedOverview() {
  try {
    console.log('🧪 Testing REVISED OVERVIEW Workflow...\n');
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

testRevisedOverview();
