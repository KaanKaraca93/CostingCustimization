/**
 * Placement Configuration
 * Maps Placement IDs to their names for BOM processing
 */

const PLACEMENT_TABLE = [
  { Id: 99, Code: "1", Name: "Ana Kumaş" },
  { Id: 100, Code: "2", Name: "Garni 1" },
  { Id: 5, Code: "3", Name: "Garni 2" },
  { Id: 6, Code: "4", Name: "Garni 3" },
  { Id: 7, Code: "5", Name: "Garni 4" },
  { Id: 8, Code: "6", Name: "Astar 1" },
  { Id: 9, Code: "7", Name: "Astar 2" },
  { Id: 10, Code: "8", Name: "Astar 3" },
  { Id: 11, Code: "9", Name: "Sucuka Astar" },
  { Id: 57, Code: "77", Name: "Sucuka Astar" },
  { Id: 58, Code: "78", Name: "Astar 4" },
  { Id: 59, Code: "79", Name: "Astar 5" },
  { Id: 67, Code: "87", Name: "Lycra Astar" },
  { Id: 63, Code: "83", Name: "Garni 5" },
  { Id: 64, Code: "84", Name: "Garni 6" },
  { Id: 54, Code: "73", Name: "Nakış" },
  { Id: 38, Code: "44", Name: "Kemer" }
];

// Currency conversion rates to CurrencyId=3 (base)
const CURRENCY_RATES = {
  1: 56,   // CurrencyId 1 → multiply by 56 to get CurrencyId 3
  3: 48,   // CurrencyId 3 → multiply by 48 (base)
  4: 1     // CurrencyId 4 → multiply by 1
};

// Cost element code mapping for BOM
const BOM_COST_ELEMENT_CODES = {
  // Ana Kumaş (Main Fabric)
  MAIN_FABRIC_PRICE: 'KPRC',
  MAIN_FABRIC_QUANTITY: 'KSARF',
  MAIN_FABRIC_CURRENCY: 'KKUR',
  
  // Astar (Lining)
  LINING_PRICE: 'APRC',
  LINING_QUANTITY: 'ASARF',
  LINING_CURRENCY: 'AKUR',
  
  // Garni 1
  GARNI1_PRICE: 'G1PRC',
  GARNI1_QUANTITY: 'G1SARF',
  GARNI1_CURRENCY: 'G1KUR',
  
  // Garni 2
  GARNI2_PRICE: 'G2PRC',
  GARNI2_QUANTITY: 'G2SARF',
  GARNI2_CURRENCY: 'G2KUR',
  
  // Garni 3+
  GARNI3_PRICE: 'G3PRC',
  GARNI3_QUANTITY: 'G3SARF',
  GARNI3_CURRENCY: 'G3KUR',
  
  // Nakış (Embroidery)
  EMBROIDERY_PRICE: 'IPRC',
  EMBROIDERY_CURRENCY: 'IKUR',
  
  // Kemer (Belt)
  BELT_PRICE: 'KEPRC',
  BELT_CURRENCY: 'KEKUR',
  
  // Other Trims
  OTHER_TRIMS: 'ATRM'
};

// Placement groupings
const PLACEMENT_GROUPS = {
  MAIN_FABRIC: [99],
  LINING: [8, 9, 10, 11, 57, 58, 59, 67],
  GARNI1: [100],
  GARNI2: [5],
  GARNI3: [6, 7, 63, 64],
  EMBROIDERY: [54],
  BELT: [38]
};

module.exports = {
  PLACEMENT_TABLE,
  CURRENCY_RATES,
  BOM_COST_ELEMENT_CODES,
  PLACEMENT_GROUPS
};

