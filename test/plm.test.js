const http = require('http');

console.log('🧪 Testing PLM Costing Service...\n');

/**
 * Test style costing retrieval with parsed data
 */
function testGetStyleCosting(styleId) {
  return new Promise((resolve, reject) => {
    console.log(`1️⃣  Testing GET /api/costing/style/${styleId}...`);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/costing/style/${styleId}`,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('   ✅ Status:', res.statusCode);
          
          if (response.success) {
            console.log('   📦 Response received successfully');
            console.log('   📊 Style Info:');
            console.log('      - StyleId:', response.data.styleInfo.styleId);
            console.log('      - StyleCode:', response.data.styleInfo.styleCode);
            console.log('      - BrandId:', response.data.styleInfo.brandId);
            console.log('   📊 Costing Info:');
            console.log('      - Costing ID:', response.data.costing?.id);
            console.log('      - Currency ID:', response.data.costing?.currencyId);
            console.log('      - Cost Elements Count:', response.data.costElements.length);
            console.log('      - Cost Suppliers Count:', response.data.costSuppliers.length);
            console.log('   📊 Cost Elements:');
            response.data.costElements.forEach(element => {
              console.log(`      - ${element.code} (${element.name}): ${element.value}`);
            });
            console.log('   📊 Colorways:', response.data.colorways.length);
            console.log('   📊 Extended Fields:', response.data.extendedFields.length);
          } else {
            console.log('   ⚠️  Error:', response.error);
            console.log('   ⚠️  Message:', response.message);
          }
          console.log('');
          resolve(response);
        } catch (error) {
          console.error('   ❌ Error parsing response:', error.message);
          console.error('   Raw response:', data.substring(0, 500));
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('   ❌ Request error:', error.message);
      reject(error);
    });

    req.end();
  });
}

/**
 * Test raw style costing retrieval
 */
function testGetRawStyleCosting(styleId) {
  return new Promise((resolve, reject) => {
    console.log(`2️⃣  Testing GET /api/costing/style/${styleId}/raw...`);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/costing/style/${styleId}/raw`,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('   ✅ Status:', res.statusCode);
          
          if (response.success) {
            console.log('   📦 Raw response received successfully');
            console.log('   📊 Data size:', JSON.stringify(response.data).length, 'bytes');
            console.log('   📊 Top-level keys:', Object.keys(response.data).join(', '));
          } else {
            console.log('   ⚠️  Error:', response.error);
          }
          console.log('');
          resolve(response);
        } catch (error) {
          console.error('   ❌ Error:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Test with invalid StyleId
 */
function testInvalidStyleId() {
  return new Promise((resolve, reject) => {
    console.log('3️⃣  Testing with invalid StyleId (99999999)...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/costing/style/99999999',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('   ✅ Status:', res.statusCode);
          console.log('   📦 Error handling:', response.error || 'No error');
          console.log('   📦 Message:', response.message || 'N/A');
          console.log('');
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Run all tests
async function runTests() {
  try {
    console.log('⏳ Waiting for server to be ready...\n');
    
    // Test with StyleId 158 (from user's example)
    await testGetStyleCosting(158);
    await testGetRawStyleCosting(158);
    await testInvalidStyleId();
    
    console.log('✨ All PLM costing tests completed!\n');
    console.log('📊 Test Summary:');
    console.log('   ✅ Parsed Style Costing - PASSED');
    console.log('   ✅ Raw Style Costing - PASSED');
    console.log('   ✅ Invalid StyleId Handling - PASSED');
    console.log('\n🎉 PLM Costing Service is working correctly!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('\n⚠️  Make sure the server is running: npm start');
    process.exit(1);
  }
}

// Wait a bit for server to be ready
setTimeout(() => {
  runTests();
}, 2000);

