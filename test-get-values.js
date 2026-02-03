const axios = require('axios');

// Test the get-cost-element-values endpoint
async function testGetCostElementValues() {
  try {
    console.log('🧪 Testing GET Cost Element Values API...\n');

    const url = 'http://localhost:3000/api/workflow/get-cost-element-values';
    
    const payload = {
      filter: "StyleId eq 11457"
    };

    console.log('📤 Request:');
    console.log(JSON.stringify(payload, null, 2));
    console.log('\n⏳ Sending request...\n');

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Response Status:', response.status);
    console.log('📥 Response Data:');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    if (error.response) {
      console.error('❌ Error Response:', error.response.status);
      console.error('📥 Error Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

// Run test
testGetCostElementValues();
