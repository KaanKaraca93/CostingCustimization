/**
 * Test for REVISED OVERVIEW workflow with decision table values from input
 * Test Date: 2026-01-16
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000/api/workflow/process';

// Test payload with NEW decision table values structure
const testPayload = {
  workflowdefination: "UPDATED_STYLE_OVERVIEW",
  moduleId: "11457", // Test StyleId
  decisionTableValues: {
    PSF: 5499,      // Segment PSF (all unlocked suppliers)
    MU: 5.3,        // Mark Up (all unlocked suppliers)
    KDV: 0.1,       // Tax rate (all unlocked suppliers)
    GKUR: 55,       // Exchange rate (all unlocked suppliers)
    FOB: 16.36,     // FOB value (only SupplierId=2)
    KHDF: 3.5,      // Target fabric cost (only SupplierId=2)
    VRG: 1,         // VRG for SupplierId=2 (others use mapping)
    NAVL: 1         // NAVL for SupplierId=2 (others use mapping)
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
