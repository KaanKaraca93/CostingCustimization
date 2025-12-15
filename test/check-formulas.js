const plmService = require('../src/services/plmService');

/**
 * Check formulas in cost elements for StyleId 158
 */
async function checkFormulas() {
  try {
    console.log('🔍 Fetching style data for StyleId: 158');
    
    const rawData = await plmService.getStyleCosting(158);
    const parsedData = plmService.parseStyleCostingData(rawData);
    
    console.log('\n📊 Cost Elements with Formulas:\n');
    
    parsedData.costElements.forEach((element, index) => {
      console.log(`${index + 1}. ${element.code} - ${element.name}`);
      console.log(`   Type: ${element.type}`);
      console.log(`   Value: ${element.value}`);
      console.log(`   Formula: ${element.formula || 'N/A'}`);
      console.log('');
    });
    
    // Show only Type=3 elements
    console.log('\n🧮 Type=3 (Calculated) Elements:\n');
    const calculatedElements = parsedData.costElements.filter(e => e.type === 3);
    
    calculatedElements.forEach((element, index) => {
      console.log(`${index + 1}. ${element.code} - ${element.name}`);
      console.log(`   Formula: ${element.formula || 'NO FORMULA'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkFormulas();

