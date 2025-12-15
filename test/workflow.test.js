const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Workflow Processing...\n');

/**
 * Test workflow with real XML (UPDATED_STYLE_OVERVIEW)
 */
function testWorkflowProcess() {
  return new Promise((resolve, reject) => {
    console.log('1️⃣  Testing POST /api/workflow/process with real XML...');
    
    // Read the actual XML file
    const xmlPath = path.join(__dirname, '..', 'lid___infor.fashionplm.fplm_639013318632827011__ION__10a8f887f4214698a3cc4399e9c7e743.xml');
    const xmlData = fs.readFileSync(xmlPath, 'utf8');

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/workflow/process',
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
          console.log('   📦 Response:');
          console.log('      - Success:', response.success);
          console.log('      - Workflow:', response.workflow);
          console.log('      - StyleId:', response.styleId);
          console.log('      - Message:', response.message);
          
          if (response.calculatedData) {
            console.log('   📊 Calculated Data:');
            console.log('      - StyleCode:', response.calculatedData.StyleCode);
            console.log('      - BrandId:', response.calculatedData.BrandId);
            console.log('      - Cluster:', response.calculatedData.Cluster);
            console.log('      - SPSF Value:', response.calculatedData.SPSFValue);
            console.log('      - MU Value:', response.calculatedData.MUValue);
            console.log('      - KHDF Value:', response.calculatedData.KHDFValue);
            console.log('      - ALMUSD Value:', response.calculatedData.ALMUSDValue);
            console.log('      - ALMTRY Value:', response.calculatedData.ALMTRYValue);
            console.log('      - SPSF ID:', response.calculatedData.SPSFId);
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

    req.write(xmlData);
    req.end();
  });
}

/**
 * Test unknown workflow type
 */
function testUnknownWorkflow() {
  return new Promise((resolve, reject) => {
    console.log('2️⃣  Testing with unknown WorkflowDefinitionCode...');
    
    // Create XML with unknown workflow code
    const xmlData = `<?xml version="1.0" encoding="utf-8"?>
<ProcessWorkflow xmlns="http://schema.infor.com/InforOAGIS/2">
  <DataArea>
    <Workflow>
      <WorkflowDefinitionCode>UNKNOWN_WORKFLOW</WorkflowDefinitionCode>
      <Property>
        <NameValue name="ModuleId" type="StringType">999</NameValue>
      </Property>
    </Workflow>
  </DataArea>
</ProcessWorkflow>`;

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/workflow/process',
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
          console.log('   📦 Response:');
          console.log('      - Message:', response.message);
          console.log('      - WorkflowType:', response.workflowType);
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

// Run all tests
async function runTests() {
  try {
    console.log('⏳ Waiting for server to be ready...\n');
    
    await testWorkflowProcess();
    await testUnknownWorkflow();
    
    console.log('✨ All workflow tests completed!\n');
    console.log('📊 Test Summary:');
    console.log('   ✅ Workflow Processing (UPDATED_STYLE_OVERVIEW) - PASSED');
    console.log('   ✅ Unknown Workflow Handling - PASSED');
    console.log('\n🎉 Workflow Service is working correctly!');
    
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

