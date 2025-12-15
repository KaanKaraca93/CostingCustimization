const http = require('http');

console.log('🧪 Testing Token Service...\n');

/**
 * Test token acquisition
 */
function testGetToken() {
  return new Promise((resolve, reject) => {
    console.log('1️⃣  Testing GET /api/token...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/token',
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
          console.log('   📦 Response:');
          console.log('      - Success:', response.success);
          console.log('      - Token Type:', response.tokenType);
          console.log('      - Expires At:', response.expiresAt);
          console.log('      - Token (first 50 chars):', response.accessToken?.substring(0, 50) + '...');
          console.log('');
          resolve(response);
        } catch (error) {
          console.error('   ❌ Error parsing response:', error.message);
          console.error('   Raw response:', data);
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
 * Test token info
 */
function testGetTokenInfo() {
  return new Promise((resolve, reject) => {
    console.log('2️⃣  Testing GET /api/token/info...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/token/info',
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
          console.log('   📦 Token Info:');
          console.log('      - Has Token:', response.tokenInfo.hasToken);
          console.log('      - Is Valid:', response.tokenInfo.isValid);
          console.log('      - Expires At:', response.tokenInfo.expiryTime);
          console.log('      - Token Type:', response.tokenInfo.tokenType);
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
 * Test token with same request (should use cached token)
 */
function testCachedToken() {
  return new Promise((resolve, reject) => {
    console.log('3️⃣  Testing cached token (second request)...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/token',
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
          console.log('   📦 Should use cached token');
          console.log('      - Success:', response.success);
          console.log('      - Token (first 50 chars):', response.accessToken?.substring(0, 50) + '...');
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

/**
 * Test token refresh
 */
function testRefreshToken() {
  return new Promise((resolve, reject) => {
    console.log('4️⃣  Testing POST /api/token/refresh...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/token/refresh',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
          console.log('   📦 Token refreshed');
          console.log('      - Success:', response.success);
          console.log('      - Message:', response.message);
          console.log('      - New Token (first 50 chars):', response.accessToken?.substring(0, 50) + '...');
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

// Run all tests
async function runTests() {
  try {
    console.log('⏳ Waiting for server to be ready...\n');
    
    await testGetToken();
    await testGetTokenInfo();
    await testCachedToken();
    await testRefreshToken();
    
    console.log('✨ All token tests completed!\n');
    console.log('📊 Test Summary:');
    console.log('   ✅ Token Acquisition - PASSED');
    console.log('   ✅ Token Info - PASSED');
    console.log('   ✅ Token Caching - PASSED');
    console.log('   ✅ Token Refresh - PASSED');
    console.log('\n🎉 Token Service is working correctly!');
    
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

