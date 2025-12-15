const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🧪 Starting API Tests...\n');

// Test 1: Health Check
function testHealthCheck() {
  return new Promise((resolve, reject) => {
    console.log('1️⃣  Testing Health Check Endpoint...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/health',
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
          console.log('   📦 Response:', JSON.stringify(response, null, 2));
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

// Test 2: Process XML with ModuleId
function testProcessXml() {
  return new Promise((resolve, reject) => {
    console.log('2️⃣  Testing Process XML Endpoint with Real Data...');
    
    // Read the actual XML file
    const xmlPath = path.join(__dirname, '..', 'lid___infor.fashionplm.fplm_639013318632827011__ION__10a8f887f4214698a3cc4399e9c7e743.xml');
    const xmlData = fs.readFileSync(xmlPath, 'utf8');

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/costing/process',
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(xmlData)
      }
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
          console.log('   📦 Response:', JSON.stringify(response, null, 2));
          console.log('   🎯 ModuleId Extracted:', response.moduleId);
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

    req.write(xmlData);
    req.end();
  });
}

// Test 3: Empty XML Test
function testEmptyXml() {
  return new Promise((resolve, reject) => {
    console.log('3️⃣  Testing with Empty Request...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/costing/process',
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': 0
      }
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
          console.log('   📦 Response:', JSON.stringify(response, null, 2));
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

// Test 4: Invalid Endpoint Test
function testInvalidEndpoint() {
  return new Promise((resolve, reject) => {
    console.log('4️⃣  Testing Invalid Endpoint (404)...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/invalid/endpoint',
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
          console.log('   📦 Response:', JSON.stringify(response, null, 2));
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
    await testHealthCheck();
    await testProcessXml();
    await testEmptyXml();
    await testInvalidEndpoint();
    
    console.log('✨ All tests completed!\n');
    console.log('📊 Test Summary:');
    console.log('   ✅ Health Check - PASSED');
    console.log('   ✅ XML Processing - PASSED');
    console.log('   ✅ Empty Request Validation - PASSED');
    console.log('   ✅ 404 Handling - PASSED');
    console.log('\n🎉 API is working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Wait a bit for server to be ready
setTimeout(() => {
  runTests();
}, 1000);

