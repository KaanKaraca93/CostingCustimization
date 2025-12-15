const plmService = require('../src/services/plmService');

async function testBomRaw() {
  try {
    console.log('🧪 Testing BOM API (RAW DATA)...\n');
    
    const styleId = 158;
    const rawData = await plmService.getStyleBom(styleId);
    
    if (rawData) {
      console.log('\n✅ RAW DATA RECEIVED\n');
      console.log('StyleId:', rawData.StyleId);
      console.log('StyleCode:', rawData.StyleCode);
      console.log('\nStyleBOM:', rawData.StyleBOM ? 'EXISTS' : 'NULL');
      
      if (rawData.StyleBOM) {
        console.log('StyleBOM length:', rawData.StyleBOM.length);
        if (rawData.StyleBOM.length > 0) {
          const bom = rawData.StyleBOM[0];
          console.log('BOM Id:', bom.Id);
          console.log('BOMLine:', bom.BOMLine ? 'EXISTS' : 'NULL');
          if (bom.BOMLine) {
            console.log('BOMLine length:', bom.BOMLine.length);
            console.log('\nFirst 3 BOM Lines (RAW):');
            bom.BOMLine.slice(0, 3).forEach((line, idx) => {
              console.log(`\n${idx + 1}.`, JSON.stringify(line, null, 2));
            });
          }
        }
      }
      
    } else {
      console.log('❌ No data returned');
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
}

testBomRaw();

