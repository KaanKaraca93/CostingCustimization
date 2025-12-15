const fs = require('fs');
const http = require('http');

const xml = fs.readFileSync('test-bom-158.xml', 'utf8');

const options = {
  method: 'POST',
  hostname: 'localhost',
  port: 3000,
  path: '/api/workflow/process',
  headers: {
    'Content-Type': 'application/xml',
    'Content-Length': Buffer.byteLength(xml)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    const result = JSON.parse(data);
    
    console.log('✅ Success:', result.success);
    console.log('📦 BOM Lines:', result.bomLinesCount);
    console.log('💾 Supplier Values:', result.calculatedData?.supplierValues?.length || 0);
    
    if (result.calculatedData?.supplierValues) {
      console.log('\n📊 Sample Cost Element Values:');
      const uniqueElements = {};
      result.calculatedData.supplierValues.forEach(v => {
        if (!uniqueElements[v.elementCode]) {
          uniqueElements[v.elementCode] = v.Value;
        }
      });
      
      Object.keys(uniqueElements).slice(0, 15).forEach(code => {
        console.log(`   ${code}: ${uniqueElements[code]}`);
      });
    }
    
    // Check for extended fields
    const extFields = Object.keys(result.calculatedData || {}).filter(k => k.endsWith('_extid'));
    if (extFields.length > 0) {
      console.log(`\n📝 Extended Fields: ${extFields.length}`);
      extFields.forEach(field => {
        const code = field.replace('_extid', '');
        console.log(`   ${code}: ${result.calculatedData[code + '_extvalue']}`);
      });
    }
    
    console.log('\n✅ Test completed!');
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.write(xml);
req.end();

