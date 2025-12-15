const plmService = require('../src/services/plmService');

async function testBomApi() {
  try {
    console.log('🧪 Testing BOM API...\n');
    
    const styleId = 158;
    console.log(`Fetching BOM data for StyleId: ${styleId}`);
    
    const data = await plmService.getAndParseStyleBom(styleId);
    
    if (data) {
      console.log('\n✅ SUCCESS! Data received:\n');
      console.log('Style Info:', {
        styleId: data.styleInfo?.styleId,
        styleCode: data.styleInfo?.styleCode,
        brandId: data.styleInfo?.brandId
      });
      
      console.log('\nBOM Lines:', data.bom?.bomLines?.length || 0);
      
      if (data.bom?.bomLines && data.bom.bomLines.length > 0) {
        console.log('\nFirst 5 BOM Lines:');
        data.bom.bomLines.slice(0, 5).forEach((line, idx) => {
          console.log(`${idx + 1}. ${line.code} - ${line.name}`);
          console.log(`   Placement2: ${line.placement2}`);
          console.log(`   Quantity: ${line.quantity}, Price: ${line.purchasePrice}, Currency: ${line.currencyId}`);
        });
      }
      
      console.log('\nCost Elements:', data.costElements?.length || 0);
      console.log('Cost Suppliers:', data.costSuppliers?.length || 0);
      
    } else {
      console.log('❌ No data returned');
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testBomApi();

