const plmService = require('../src/services/plmService');

async function checkRMU() {
  try {
    console.log('🔍 Checking RMU formula and values...\n');
    
    const styleId = 158;
    const data = await plmService.getAndParseStyleBom(styleId);
    
    if (!data) {
      console.log('❌ No data');
      return;
    }
    
    const costElements = data.costElements || [];
    
    // Find RMU
    const rmu = costElements.find(e => e.code === 'RMU');
    if (rmu) {
      console.log('RMU Element:');
      console.log('  Code:', rmu.code);
      console.log('  Type:', rmu.type);
      console.log('  Formula:', rmu.formula);
      console.log('  Value:', rmu.value);
      console.log('  Supplier Values:', rmu.supplierValues?.length || 0);
    } else {
      console.log('❌ RMU not found');
    }
    
    // Find SPSF, RPSF
    const spsf = costElements.find(e => e.code === 'SPSF');
    const rpsf = costElements.find(e => e.code === 'RPSF');
    
    console.log('\nSPSF:');
    if (spsf) {
      console.log('  Type:', spsf.type);
      console.log('  Value:', spsf.value);
      if (spsf.supplierValues && spsf.supplierValues.length > 0) {
        console.log('  First Supplier Value:', spsf.supplierValues[0].Value);
      }
    } else {
      console.log('  Not found');
    }
    
    console.log('\nRPSF:');
    if (rpsf) {
      console.log('  Type:', rpsf.type);
      console.log('  Value:', rpsf.value);
      if (rpsf.supplierValues && rpsf.supplierValues.length > 0) {
        console.log('  First Supplier Value:', rpsf.supplierValues[0].Value);
      }
    } else {
      console.log('  Not found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkRMU();

