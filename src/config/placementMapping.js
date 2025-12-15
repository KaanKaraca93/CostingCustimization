/**
 * BOM Placement to Cost Element Mapping Configuration
 */

// Currency ID to exchange rate mapping
const CURRENCY_RATES = {
  1: 56,  // Currency 1 → Rate 56
  3: 48,  // Currency 3 → Rate 48
  4: 1    // Currency 4 → Rate 1 (TRY)
};

// Placement mappings
const PLACEMENT_MAPPINGS = {
  // Ana Kumaş (Main Fabric) - Placement 99
  ANA_KUMAS: {
    placements: [99],
    costElements: {
      price: 'KPRC',
      quantity: 'KSARF',
      currency: 'KKUR'
    },
    singleItem: true
  },

  // Astar (Lining) - Multiple placements
  ASTAR: {
    placements: [6, 7, 8, 9, 10, 11, 57, 58, 59, 67, 77, 78, 79],
    costElements: {
      price: 'APRC',      // Weighted average
      quantity: 'ASARF',  // Total
      currency: 'AKUR'
    },
    weightedAverage: true,
    normalizeCurrency: 3  // Normalize to Currency 3
  },

  // Garni 1 - Placement 100
  GARNI_1: {
    placements: [100],
    costElements: {
      price: 'G1PRC',
      quantity: 'G1SARF',
      currency: 'G1KUR'
    },
    singleItem: true
  },

  // Garni 2 - Placement 5
  GARNI_2: {
    placements: [5],
    costElements: {
      price: 'G2PRC',
      quantity: 'G2SARF',
      currency: 'G2KUR'
    },
    singleItem: true
  },

  // Garni 3 - Placements 6, 7, 63, 64
  GARNI_3: {
    placements: [6, 7, 63, 64],
    costElements: {
      price: 'G3PRC',     // Weighted average
      quantity: 'G3SARF', // Total
      currency: 'G3KUR'
    },
    weightedAverage: true,
    normalizeCurrency: 3
  },

  // Nakış (Embroidery) - Placement 54
  NAKIS: {
    placements: [54],
    costElements: {
      price: 'IPRC',   // Sum of (price * quantity)
      currency: 'IKUR'
    },
    priceTimesQuantity: true,
    normalizeCurrency: 3
  },

  // Kemer (Belt) - Placement 38
  KEMER: {
    placements: [38],
    costElements: {
      price: 'KEPRC',  // Sum of (price * quantity)
      currency: 'KEKUR'
    },
    priceTimesQuantity: true,
    normalizeCurrency: 3
  },

  // Other trims - All other placements
  DIGER_TRIMS: {
    costElements: {
      price: 'ATRM'  // Total in TRY (Currency 4)
    },
    convertToTRY: true
  }
};

/**
 * Get currency rate for conversion
 * @param {number} currencyId - Currency ID
 * @returns {number} Exchange rate
 */
function getCurrencyRate(currencyId) {
  return CURRENCY_RATES[currencyId] || 1;
}

/**
 * Check if placement belongs to a specific category
 * @param {string} placement2 - Placement2 value (can be comma-separated)
 * @param {Array} targetPlacements - Array of placement IDs to check
 * @returns {boolean}
 */
function isPlacementInCategory(placement2, targetPlacements) {
  if (!placement2) return false;
  
  // Placement2 can be comma-separated like "99,100"
  const placements = placement2.split(',').map(p => parseInt(p.trim()));
  
  // Check if any of the placements match
  return placements.some(p => targetPlacements.includes(p));
}

/**
 * Get all defined placement IDs (to identify "other" placements)
 * @returns {Array} Array of all explicitly mapped placement IDs
 */
function getAllDefinedPlacements() {
  const defined = [];
  
  Object.keys(PLACEMENT_MAPPINGS).forEach(key => {
    if (key !== 'DIGER_TRIMS' && PLACEMENT_MAPPINGS[key].placements) {
      defined.push(...PLACEMENT_MAPPINGS[key].placements);
    }
  });
  
  return defined;
}

module.exports = {
  CURRENCY_RATES,
  PLACEMENT_MAPPINGS,
  getCurrencyRate,
  isPlacementInCategory,
  getAllDefinedPlacements
};

