const plmService = require('../src/services/plmService');

async function debugSPSF() {
  try {
    const data = await plmService.getAndParseStyleBom(158);
    
    const spsf = data.costElements.find(e => e.code === 'SPSF');
    const suppliers = data.costSuppliers || [];
    const unlockedSuppliers = suppliers.filter(s => !s.isLock);
    
    console.log('SPSF Element:');
    console.log('  Code:', spsf.code);
    console.log('  Type:', spsf.type);
    console.log('  Value (element.value):', spsf.value);
    console.log('  SupplierValues count:', spsf.supplierValues?.length);
    
    console.log('\n  All Supplier Values:');
    spsf.supplierValues?.forEach((sv, idx) => {
      console.log(`    ${idx+1}. StyleCostingSupplierId: ${sv.StyleCostingSupplierId}, Value: ${sv.Value}, Type: ${typeof sv.Value}`);
    });
    
    console.log('\nUnlocked Suppliers:');
    unlockedSuppliers.forEach((sup, idx) => {
      console.log(`  ${idx+1}. Id: ${sup.id}, Code: ${sup.supplierInfo?.code}, IsLock: ${sup.isLock}`);
    });
    
    if (unlockedSuppliers.length > 0) {
      const firstUnlockedSupplierId = unlockedSuppliers[0].id;
      console.log('\nFirst unlocked supplier ID:', firstUnlockedSupplierId);
      
      const supplierVal = spsf.supplierValues.find(val => val.StyleCostingSupplierId === firstUnlockedSupplierId);
      
      if (supplierVal) {
        console.log('Found supplier value:');
        console.log('  StyleCostingSupplierId:', supplierVal.StyleCostingSupplierId);
        console.log('  Value:', supplierVal.Value);
        console.log('  Parsed:', parseFloat(supplierVal.Value));
      } else {
        console.log('❌ Supplier value NOT found for first unlocked supplier');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugSPSF();

