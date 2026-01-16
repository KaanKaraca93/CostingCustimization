/**
 * VRG and NAVL Mapping Configuration
 * Based on CountryId and BrandId
 * Updated: 2026-01-16
 */

const VRG_NAVL_MAPPING = [
  // BrandId 4
  { CountryId: 77, BrandId: 4, VRG: 1.38, NAVL: 1.1 },
  { CountryId: 96, BrandId: 4, VRG: 1, NAVL: 1.02 },
  { CountryId: 83, BrandId: 4, VRG: 1.34, NAVL: 1.1 },
  { CountryId: 69, BrandId: 4, VRG: 1, NAVL: 1 },
  
  // BrandId 8
  { CountryId: 77, BrandId: 8, VRG: 1.51, NAVL: 1.1 },
  { CountryId: 96, BrandId: 8, VRG: 1, NAVL: 1.02 },
  { CountryId: 83, BrandId: 8, VRG: 1.34, NAVL: 1.1 },
  { CountryId: 69, BrandId: 8, VRG: 1, NAVL: 1 }
];

/**
 * Find VRG and NAVL values by CountryId and BrandId
 * @param {number} countryId - Country ID (nullable)
 * @param {number} brandId - Brand ID
 * @returns {Object} { VRG, NAVL } - Returns default { VRG: 1, NAVL: 1 } if not found
 */
function findVrgNavl(countryId, brandId) {
  // Handle null or undefined CountryId -> default values
  if (countryId === null || countryId === undefined) {
    console.log(`⚠️  CountryId is null/undefined, using default VRG=1, NAVL=1`);
    return { VRG: 1, NAVL: 1 };
  }

  // Find in mapping table
  const mapping = VRG_NAVL_MAPPING.find(
    entry => entry.CountryId === countryId && entry.BrandId === brandId
  );

  if (mapping) {
    console.log(`✅ Found VRG/NAVL mapping: CountryId=${countryId}, BrandId=${brandId} → VRG=${mapping.VRG}, NAVL=${mapping.NAVL}`);
    return { VRG: mapping.VRG, NAVL: mapping.NAVL };
  }

  // Default if not found
  console.log(`⚠️  No VRG/NAVL mapping found for CountryId=${countryId}, BrandId=${brandId}, using default VRG=1, NAVL=1`);
  return { VRG: 1, NAVL: 1 };
}

module.exports = {
  VRG_NAVL_MAPPING,
  findVrgNavl
};
