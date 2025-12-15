const http = require('http');

const styleId = 158;

const options = {
  hostname: 'localhost',
  port: 3000,
  path: `/api/costing/style/${styleId}/raw`,
  method: 'GET'
};

console.log(`🔍 Fetching raw data for StyleId: ${styleId}\n`);

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (response.success) {
        console.log('✅ Success!\n');
        console.log('📦 Full Raw Response:');
        console.log(JSON.stringify(response.data, null, 2));
      } else {
        console.log('❌ Error:', response.error);
        console.log('Message:', response.message);
      }
    } catch (error) {
      console.error('❌ Parse error:', error.message);
      console.log('Raw data:', data.substring(0, 1000));
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.end();

