/**
 * Decision Table for Costing Calculations
 * Based on BrandId, SubCategoryId, UDF5Id, and Cluster
 */

const DECISION_TABLE = [
  // IPEKYOL (BrandId: 4) - Cluster: 013-B ve 016-E
  { BrandId: 4, SubCategoryId: 8, UDF5Id: 1, Cluster: "016-E", SegmentPSF: 5499, MU: 4.8, KumaşHedefMaliyet: 0, AlımFiyatı_USD: 21.70, AlımFiyatı_TRY: 1041.48 },
  { BrandId: 4, SubCategoryId: 33, UDF5Id: 1, Cluster: "013-B", SegmentPSF: 5999, MU: 4.5, KumaşHedefMaliyet: 0, AlımFiyatı_USD: 25.25, AlımFiyatı_TRY: 1211.92 },
  { BrandId: 4, SubCategoryId: 21, UDF5Id: 1, Cluster: "013-B", SegmentPSF: 1599, MU: 4.5, KumaşHedefMaliyet: 3, AlımFiyatı_USD: 6.73, AlımFiyatı_TRY: 323.03 },
  { BrandId: 4, SubCategoryId: 21, UDF5Id: 2, Cluster: "013-B", SegmentPSF: 2799, MU: 4.5, KumaşHedefMaliyet: 4, AlımFiyatı_USD: 11.78, AlımFiyatı_TRY: 565.45 },
  { BrandId: 4, SubCategoryId: 21, UDF5Id: 3, Cluster: "013-B", SegmentPSF: 3799, MU: 4.5, KumaşHedefMaliyet: 5, AlımFiyatı_USD: 15.99, AlımFiyatı_TRY: 767.47 },
  { BrandId: 4, SubCategoryId: 21, UDF5Id: 4, Cluster: "013-B", SegmentPSF: 4799, MU: 4.5, KumaşHedefMaliyet: 7, AlımFiyatı_USD: 20.20, AlımFiyatı_TRY: 969.49 },
  { BrandId: 4, SubCategoryId: 21, UDF5Id: 5, Cluster: "013-B", SegmentPSF: 6499, MU: 4.5, KumaşHedefMaliyet: 9, AlımFiyatı_USD: 27.35, AlımFiyatı_TRY: 1312.93 },
  { BrandId: 4, SubCategoryId: 41, UDF5Id: 1, Cluster: "016-E", SegmentPSF: 4699, MU: 4.8, KumaşHedefMaliyet: 0, AlımFiyatı_USD: 18.54, AlımFiyatı_TRY: 889.96 },
  { BrandId: 4, SubCategoryId: 19, UDF5Id: 1, Cluster: "013-B", SegmentPSF: 3949, MU: 4.5, KumaşHedefMaliyet: 5, AlımFiyatı_USD: 16.62, AlımFiyatı_TRY: 797.78 },
  { BrandId: 4, SubCategoryId: 19, UDF5Id: 2, Cluster: "013-B", SegmentPSF: 5299, MU: 4.5, KumaşHedefMaliyet: 7, AlımFiyatı_USD: 22.30, AlımFiyatı_TRY: 1070.51 },
  { BrandId: 4, SubCategoryId: 19, UDF5Id: 3, Cluster: "013-B", SegmentPSF: 6999, MU: 4.5, KumaşHedefMaliyet: 8, AlımFiyatı_USD: 29.46, AlımFiyatı_TRY: 1413.94 },
  { BrandId: 4, SubCategoryId: 19, UDF5Id: 4, Cluster: "013-B", SegmentPSF: 8999, MU: 4.5, KumaşHedefMaliyet: 11, AlımFiyatı_USD: 37.87, AlımFiyatı_TRY: 1817.98 },
  { BrandId: 4, SubCategoryId: 19, UDF5Id: 5, Cluster: "013-B", SegmentPSF: 11500, MU: 4.5, KumaşHedefMaliyet: 14, AlımFiyatı_USD: 48.40, AlımFiyatı_TRY: 2323.23 },
  { BrandId: 4, SubCategoryId: 3, UDF5Id: 1, Cluster: "016-E", SegmentPSF: 1199, MU: 4.8, KumaşHedefMaliyet: 0, AlımFiyatı_USD: 4.73, AlımFiyatı_TRY: 227.08 },
  { BrandId: 4, SubCategoryId: 4, UDF5Id: 1, Cluster: "016-E", SegmentPSF: 2049, MU: 4.8, KumaşHedefMaliyet: 0, AlımFiyatı_USD: 7.41, AlımFiyatı_TRY: 355.73 },
  { BrandId: 4, SubCategoryId: 20, UDF5Id: 1, Cluster: "013-B", SegmentPSF: 3299, MU: 4.5, KumaşHedefMaliyet: 4, AlımFiyatı_USD: 13.88, AlımFiyatı_TRY: 666.46 },
  { BrandId: 4, SubCategoryId: 20, UDF5Id: 2, Cluster: "013-B", SegmentPSF: 4499, MU: 4.5, KumaşHedefMaliyet: 6, AlımFiyatı_USD: 18.94, AlımFiyatı_TRY: 908.89 },
  { BrandId: 4, SubCategoryId: 20, UDF5Id: 3, Cluster: "013-B", SegmentPSF: 5799, MU: 4.5, KumaşHedefMaliyet: 7, AlımFiyatı_USD: 24.41, AlımFiyatı_TRY: 1171.52 },
  { BrandId: 4, SubCategoryId: 20, UDF5Id: 4, Cluster: "013-B", SegmentPSF: 7499, MU: 4.5, KumaşHedefMaliyet: 9, AlımFiyatı_USD: 31.56, AlımFiyatı_TRY: 1514.95 },
  { BrandId: 4, SubCategoryId: 20, UDF5Id: 5, Cluster: "013-B", SegmentPSF: 19000, MU: 4.5, KumaşHedefMaliyet: 22, AlımFiyatı_USD: 79.97, AlımFiyatı_TRY: 3838.38 },
  
  // IPEKYOL (BrandId: 4) - Cluster: 015-D
  { BrandId: 4, SubCategoryId: 21, UDF5Id: 1, Cluster: "015-D", SegmentPSF: 1599, MU: 3.0, KumaşHedefMaliyet: 4, AlımFiyatı_USD: 10.09, AlımFiyatı_TRY: 484.55 },
  { BrandId: 4, SubCategoryId: 19, UDF5Id: 1, Cluster: "015-D", SegmentPSF: 2999, MU: 3.0, KumaşHedefMaliyet: 6, AlımFiyatı_USD: 18.93, AlımFiyatı_TRY: 908.79 },
  { BrandId: 4, SubCategoryId: 20, UDF5Id: 1, Cluster: "015-D", SegmentPSF: 2349, MU: 3.0, KumaşHedefMaliyet: 5, AlımFiyatı_USD: 14.83, AlımFiyatı_TRY: 711.82 },
  
  // MACHKA (BrandId: 5) - Cluster: 013-B
  { BrandId: 5, SubCategoryId: 21, UDF5Id: 1, Cluster: "013-B", SegmentPSF: 16493, MU: 4.75, KumaşHedefMaliyet: 20, AlımFiyatı_USD: 65.76, AlımFiyatı_TRY: 3156.56 },
  { BrandId: 5, SubCategoryId: 19, UDF5Id: 1, Cluster: "013-B", SegmentPSF: 37498, MU: 4.75, KumaşHedefMaliyet: 41, AlımFiyatı_USD: 149.51, AlımFiyatı_TRY: 7176.65 },
  
  // TWIST (BrandId: 8) - Cluster: 013-B
  { BrandId: 8, SubCategoryId: 8, UDF5Id: 1, Cluster: "013-B", SegmentPSF: 4099, MU: 4.5, KumaşHedefMaliyet: 0, AlımFiyatı_USD: 17.25, AlımFiyatı_TRY: 828.08 },
  { BrandId: 8, SubCategoryId: 21, UDF5Id: 1, Cluster: "013-B", SegmentPSF: 1499, MU: 4.5, KumaşHedefMaliyet: 2, AlımFiyatı_USD: 6.31, AlımFiyatı_TRY: 302.83 },
  // ... (Tüm decision table'ı ekleyebilirim ama şimdilik örneklerle devam edelim)
];

// Decision table'ı hızlı arama için Map'e çevir
const DECISION_MAP = new Map();
DECISION_TABLE.forEach(entry => {
  const key = `${entry.BrandId}-${entry.SubCategoryId}-${entry.UDF5Id}-${entry.Cluster}`;
  DECISION_MAP.set(key, entry);
});

/**
 * Find decision values by BrandId, SubCategoryId, UDF5Id, and Cluster
 * @param {number} brandId 
 * @param {number} subCategoryId 
 * @param {number} udf5Id 
 * @param {string} cluster 
 * @returns {Object|null} Decision values or null if not found
 */
function findDecisionValues(brandId, subCategoryId, udf5Id, cluster) {
  const key = `${brandId}-${subCategoryId}-${udf5Id}-${cluster}`;
  return DECISION_MAP.get(key) || null;
}

module.exports = {
  DECISION_TABLE,
  findDecisionValues
};

