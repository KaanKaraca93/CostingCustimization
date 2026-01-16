"""
Decision Table for Costing Calculations - PLM Python Script
Updated: 2026-01-15
Total Entries: 244
Lookup by: MarkaId, AltKategoriId, SegmentId, LifeStyleGrupId

Note: Variable names use English characters (no Turkish special chars)
- KumasHedefMaliyet (not KumasHedefMaliyet)
- AlimFiyat_TRY (not AlimFiyat_TRY)
- AlimFiyat_USD (not AlimFiyat_USD)
"""

DECISION_TABLE = [
    {"MarkaId": 4, "AltKategoriId": 102, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 5999, "KumasHedefMaliyet": 4.4, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1186, "AlimFiyat_USD": 21.56, "Sarf": 1.96},
    {"MarkaId": 4, "AltKategoriId": 102, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 10990, "KumasHedefMaliyet": 8.06, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2172, "AlimFiyat_USD": 39.49, "Sarf": 1.96},
    {"MarkaId": 4, "AltKategoriId": 102, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 13990, "KumasHedefMaliyet": 10.26, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2765, "AlimFiyat_USD": 50.27, "Sarf": 1.96},
    {"MarkaId": 4, "AltKategoriId": 102, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 11990, "KumasHedefMaliyet": 8.79, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2370, "AlimFiyat_USD": 43.09, "Sarf": 1.96},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 1299, "KumasHedefMaliyet": 2.02, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 394, "AlimFiyat_USD": 7.16, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1799, "KumasHedefMaliyet": 2.1, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 409, "AlimFiyat_USD": 7.44, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2799, "KumasHedefMaliyet": 2.83, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 553, "AlimFiyat_USD": 10.05, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3999, "KumasHedefMaliyet": 4.05, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 790, "AlimFiyat_USD": 14.36, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.66, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2999, "KumasHedefMaliyet": 3.04, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 593, "AlimFiyat_USD": 10.78, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3799, "KumasHedefMaliyet": 3.85, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 751, "AlimFiyat_USD": 13.65, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 5.06, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 5999, "KumasHedefMaliyet": 6.07, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1186, "AlimFiyat_USD": 21.56, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 6, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2599, "KumasHedefMaliyet": 2.63, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 514, "AlimFiyat_USD": 9.35, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 57, "LifeStyleGrupId": 6, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 3.64, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 1.42},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 3599, "KumasHedefMaliyet": 5.05, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1091, "AlimFiyat_USD": 19.84, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.84, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1045, "AlimFiyat_USD": 19.0, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 5999, "KumasHedefMaliyet": 5.16, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1113, "AlimFiyat_USD": 20.24, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 3.95, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 5999, "KumasHedefMaliyet": 5.16, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1113, "AlimFiyat_USD": 20.24, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 7999, "KumasHedefMaliyet": 6.87, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1484, "AlimFiyat_USD": 26.98, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 10990, "KumasHedefMaliyet": 9.44, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2039, "AlimFiyat_USD": 37.07, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 6, "SegmentId": 1, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 3.95, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 6, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 7999, "KumasHedefMaliyet": 6.87, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1484, "AlimFiyat_USD": 26.98, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 54, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 9999, "KumasHedefMaliyet": 8.59, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1855, "AlimFiyat_USD": 33.73, "Sarf": 1.57},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 3299, "KumasHedefMaliyet": 4.49, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1000, "AlimFiyat_USD": 18.18, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 3799, "KumasHedefMaliyet": 3.87, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 863, "AlimFiyat_USD": 15.69, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 3.83, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 7999, "KumasHedefMaliyet": 6.66, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1484, "AlimFiyat_USD": 26.98, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.9, "SegmentPSF": 3799, "KumasHedefMaliyet": 3.17, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 705, "AlimFiyat_USD": 12.82, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.16, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 5999, "KumasHedefMaliyet": 5.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1113, "AlimFiyat_USD": 20.24, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 7999, "KumasHedefMaliyet": 6.66, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1484, "AlimFiyat_USD": 26.98, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 10990, "KumasHedefMaliyet": 9.15, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2039, "AlimFiyat_USD": 37.07, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 6, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.16, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 56, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 7999, "KumasHedefMaliyet": 6.66, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1484, "AlimFiyat_USD": 26.98, "Sarf": 1.62},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 3299, "KumasHedefMaliyet": 5.01, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 750, "AlimFiyat_USD": 13.64, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 3599, "KumasHedefMaliyet": 4.46, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 668, "AlimFiyat_USD": 12.15, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.9, "SegmentPSF": 2799, "KumasHedefMaliyet": 3.46, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 519, "AlimFiyat_USD": 9.44, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 3799, "KumasHedefMaliyet": 4.7, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 705, "AlimFiyat_USD": 12.82, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 5.69, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 6.18, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 6999, "KumasHedefMaliyet": 8.67, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1299, "AlimFiyat_USD": 23.62, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 6, "SegmentId": 1, "MU": 4.9, "SegmentPSF": 3299, "KumasHedefMaliyet": 4.08, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 612, "AlimFiyat_USD": 11.13, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 6, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 3599, "KumasHedefMaliyet": 4.46, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 668, "AlimFiyat_USD": 12.15, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 6, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 5.69, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 43, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 6.18, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 1.09},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 1599, "KumasHedefMaliyet": 2.37, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 485, "AlimFiyat_USD": 8.82, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1799, "KumasHedefMaliyet": 2.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 409, "AlimFiyat_USD": 7.44, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 2799, "KumasHedefMaliyet": 2.53, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 519, "AlimFiyat_USD": 9.44, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 3999, "KumasHedefMaliyet": 3.62, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 742, "AlimFiyat_USD": 13.49, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.52, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 5999, "KumasHedefMaliyet": 5.43, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1113, "AlimFiyat_USD": 20.24, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 2999, "KumasHedefMaliyet": 2.71, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 556, "AlimFiyat_USD": 10.11, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 3799, "KumasHedefMaliyet": 3.44, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 705, "AlimFiyat_USD": 12.82, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.52, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.52, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 58, "LifeStyleGrupId": 6, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 9999, "KumasHedefMaliyet": 9.06, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1855, "AlimFiyat_USD": 33.73, "Sarf": 1.49},
    {"MarkaId": 4, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1499, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 341, "AlimFiyat_USD": 6.2, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 3599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 668, "AlimFiyat_USD": 12.15, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 44, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 44, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 49, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 5999, "KumasHedefMaliyet": 6.33, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1818, "AlimFiyat_USD": 33.05, "Sarf": 2.09},
    {"MarkaId": 4, "AltKategoriId": 49, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 10990, "KumasHedefMaliyet": 7.09, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2039, "AlimFiyat_USD": 37.07, "Sarf": 2.09},
    {"MarkaId": 4, "AltKategoriId": 49, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 11990, "KumasHedefMaliyet": 7.74, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2224, "AlimFiyat_USD": 40.44, "Sarf": 2.09},
    {"MarkaId": 4, "AltKategoriId": 49, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 17990, "KumasHedefMaliyet": 11.62, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 3338, "AlimFiyat_USD": 60.69, "Sarf": 2.09},
    {"MarkaId": 4, "AltKategoriId": 49, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 9999, "KumasHedefMaliyet": 6.46, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1855, "AlimFiyat_USD": 33.73, "Sarf": 2.09},
    {"MarkaId": 4, "AltKategoriId": 49, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 11990, "KumasHedefMaliyet": 7.74, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2224, "AlimFiyat_USD": 40.44, "Sarf": 2.09},
    {"MarkaId": 4, "AltKategoriId": 49, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 17990, "KumasHedefMaliyet": 11.62, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 3338, "AlimFiyat_USD": 60.69, "Sarf": 2.09},
    {"MarkaId": 4, "AltKategoriId": 49, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 17990, "KumasHedefMaliyet": 11.62, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 3338, "AlimFiyat_USD": 60.69, "Sarf": 2.09},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.35, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1394, "AlimFiyat_USD": 25.35, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 4999, "KumasHedefMaliyet": 3.55, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1136, "AlimFiyat_USD": 20.65, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 5.1, "SegmentPSF": 6999, "KumasHedefMaliyet": 3.9, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1248, "AlimFiyat_USD": 22.69, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 5.1, "SegmentPSF": 9999, "KumasHedefMaliyet": 5.56, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1782, "AlimFiyat_USD": 32.4, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 5.1, "SegmentPSF": 12990, "KumasHedefMaliyet": 7.23, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2316, "AlimFiyat_USD": 42.11, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 5.1, "SegmentPSF": 17990, "KumasHedefMaliyet": 10.01, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 3207, "AlimFiyat_USD": 58.31, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 5.1, "SegmentPSF": 6999, "KumasHedefMaliyet": 3.9, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1248, "AlimFiyat_USD": 22.69, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 5.1, "SegmentPSF": 9999, "KumasHedefMaliyet": 5.56, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1782, "AlimFiyat_USD": 32.4, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 5.1, "SegmentPSF": 12990, "KumasHedefMaliyet": 7.23, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2316, "AlimFiyat_USD": 42.11, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 5.1, "SegmentPSF": 17990, "KumasHedefMaliyet": 10.01, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 3207, "AlimFiyat_USD": 58.31, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 5.1, "SegmentPSF": 12990, "KumasHedefMaliyet": 7.23, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2316, "AlimFiyat_USD": 42.11, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 51, "LifeStyleGrupId": 6, "SegmentId": 5, "MU": 5.1, "SegmentPSF": 17990, "KumasHedefMaliyet": 10.01, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 3207, "AlimFiyat_USD": 58.31, "Sarf": 2.33},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 1499, "KumasHedefMaliyet": 2.43, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 454, "AlimFiyat_USD": 8.25, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.3, "SegmentPSF": 2799, "KumasHedefMaliyet": 3.16, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 592, "AlimFiyat_USD": 10.76, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.3, "SegmentPSF": 3999, "KumasHedefMaliyet": 4.52, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 845, "AlimFiyat_USD": 15.36, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.3, "SegmentPSF": 4999, "KumasHedefMaliyet": 5.65, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1057, "AlimFiyat_USD": 19.22, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.3, "SegmentPSF": 2999, "KumasHedefMaliyet": 3.39, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 634, "AlimFiyat_USD": 11.53, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.3, "SegmentPSF": 3999, "KumasHedefMaliyet": 4.52, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 845, "AlimFiyat_USD": 15.36, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.3, "SegmentPSF": 4999, "KumasHedefMaliyet": 5.65, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1057, "AlimFiyat_USD": 19.22, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.3, "SegmentPSF": 5999, "KumasHedefMaliyet": 6.78, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1268, "AlimFiyat_USD": 23.05, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 6, "SegmentId": 3, "MU": 4.3, "SegmentPSF": 4599, "KumasHedefMaliyet": 5.2, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 972, "AlimFiyat_USD": 17.67, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.3, "SegmentPSF": 4999, "KumasHedefMaliyet": 5.65, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1057, "AlimFiyat_USD": 19.22, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 47, "LifeStyleGrupId": 6, "SegmentId": 5, "MU": 4.3, "SegmentPSF": 5999, "KumasHedefMaliyet": 6.78, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1268, "AlimFiyat_USD": 23.05, "Sarf": 1.36},
    {"MarkaId": 4, "AltKategoriId": 53, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.61, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1515, "AlimFiyat_USD": 27.55, "Sarf": 2.39},
    {"MarkaId": 4, "AltKategoriId": 53, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 6999, "KumasHedefMaliyet": 3.95, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1299, "AlimFiyat_USD": 23.62, "Sarf": 2.39},
    {"MarkaId": 4, "AltKategoriId": 53, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 9999, "KumasHedefMaliyet": 5.65, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1855, "AlimFiyat_USD": 33.73, "Sarf": 2.39},
    {"MarkaId": 4, "AltKategoriId": 53, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 9999, "KumasHedefMaliyet": 5.65, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1855, "AlimFiyat_USD": 33.73, "Sarf": 2.39},
    {"MarkaId": 4, "AltKategoriId": 53, "LifeStyleGrupId": 6, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 7999, "KumasHedefMaliyet": 4.52, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1484, "AlimFiyat_USD": 26.98, "Sarf": 2.39},
    {"MarkaId": 4, "AltKategoriId": 84, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 2799, "KumasHedefMaliyet": 2.98, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 636, "AlimFiyat_USD": 11.56, "Sarf": 1.55},
    {"MarkaId": 4, "AltKategoriId": 84, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 1.55},
    {"MarkaId": 4, "AltKategoriId": 84, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.35, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 927, "AlimFiyat_USD": 16.85, "Sarf": 1.55},
    {"MarkaId": 4, "AltKategoriId": 84, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 5999, "KumasHedefMaliyet": 5.22, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1113, "AlimFiyat_USD": 20.24, "Sarf": 1.55},
    {"MarkaId": 4, "AltKategoriId": 84, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 3599, "KumasHedefMaliyet": 3.14, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 668, "AlimFiyat_USD": 12.15, "Sarf": 1.55},
    {"MarkaId": 4, "AltKategoriId": 84, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 1.55},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 699, "KumasHedefMaliyet": 1.97, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 212, "AlimFiyat_USD": 3.85, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 959, "KumasHedefMaliyet": 2.03, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 218, "AlimFiyat_USD": 3.96, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 1399, "KumasHedefMaliyet": 2.43, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 260, "AlimFiyat_USD": 4.73, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 1799, "KumasHedefMaliyet": 3.11, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 334, "AlimFiyat_USD": 6.07, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 2299, "KumasHedefMaliyet": 3.98, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 427, "AlimFiyat_USD": 7.76, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 3599, "KumasHedefMaliyet": 6.23, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 668, "AlimFiyat_USD": 12.15, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 1499, "KumasHedefMaliyet": 2.59, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 278, "AlimFiyat_USD": 5.05, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 1799, "KumasHedefMaliyet": 3.11, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 334, "AlimFiyat_USD": 6.07, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 2299, "KumasHedefMaliyet": 3.98, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 427, "AlimFiyat_USD": 7.76, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 3299, "KumasHedefMaliyet": 5.71, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 612, "AlimFiyat_USD": 11.13, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 6, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 1799, "KumasHedefMaliyet": 3.11, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 334, "AlimFiyat_USD": 6.07, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 60, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 2299, "KumasHedefMaliyet": 3.98, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 427, "AlimFiyat_USD": 7.76, "Sarf": 0.78},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 1499, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 454, "AlimFiyat_USD": 8.25, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1799, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 409, "AlimFiyat_USD": 7.44, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 2799, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 519, "AlimFiyat_USD": 9.44, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 3599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 668, "AlimFiyat_USD": 12.15, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 7999, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1484, "AlimFiyat_USD": 26.98, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.9, "SegmentPSF": 1799, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 334, "AlimFiyat_USD": 6.07, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 2999, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 556, "AlimFiyat_USD": 10.11, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 3599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 668, "AlimFiyat_USD": 12.15, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.9, "SegmentPSF": 6999, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1299, "AlimFiyat_USD": 23.62, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 6, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 2799, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 519, "AlimFiyat_USD": 9.44, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 6, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 3599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 668, "AlimFiyat_USD": 12.15, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 61, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.9, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 853, "AlimFiyat_USD": 15.51, "Sarf": 0.0},
    {"MarkaId": 4, "AltKategoriId": 82, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.9, "SegmentPSF": 5999, "KumasHedefMaliyet": 4.47, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1113, "AlimFiyat_USD": 20.24, "Sarf": 1.81},
    {"MarkaId": 4, "AltKategoriId": 82, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 9999, "KumasHedefMaliyet": 7.45, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1855, "AlimFiyat_USD": 33.73, "Sarf": 1.81},
    {"MarkaId": 4, "AltKategoriId": 55, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.9, "SegmentPSF": 5999, "KumasHedefMaliyet": 12.85, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1113, "AlimFiyat_USD": 20.24, "Sarf": 0.63},
    {"MarkaId": 4, "AltKategoriId": 55, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.9, "SegmentPSF": 6999, "KumasHedefMaliyet": 15.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1299, "AlimFiyat_USD": 23.62, "Sarf": 0.63},
    {"MarkaId": 8, "AltKategoriId": 102, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 3.67, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 1.96},
    {"MarkaId": 8, "AltKategoriId": 102, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 5999, "KumasHedefMaliyet": 4.4, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1186, "AlimFiyat_USD": 21.56, "Sarf": 1.96},
    {"MarkaId": 8, "AltKategoriId": 102, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 6999, "KumasHedefMaliyet": 5.13, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1383, "AlimFiyat_USD": 25.15, "Sarf": 1.96},
    {"MarkaId": 8, "AltKategoriId": 102, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 9999, "KumasHedefMaliyet": 7.33, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1976, "AlimFiyat_USD": 35.93, "Sarf": 1.96},
    {"MarkaId": 8, "AltKategoriId": 57, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1799, "KumasHedefMaliyet": 2.1, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 409, "AlimFiyat_USD": 7.44, "Sarf": 1.42},
    {"MarkaId": 8, "AltKategoriId": 57, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.6, "SegmentPSF": 1799, "KumasHedefMaliyet": 1.82, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 356, "AlimFiyat_USD": 6.47, "Sarf": 1.42},
    {"MarkaId": 8, "AltKategoriId": 57, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 3.99654069044168, "SegmentPSF": 2299, "KumasHedefMaliyet": 2.68, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 523, "AlimFiyat_USD": 9.51, "Sarf": 1.42},
    {"MarkaId": 8, "AltKategoriId": 57, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 3.64, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 1.42},
    {"MarkaId": 8, "AltKategoriId": 57, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.66, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 1.42},
    {"MarkaId": 8, "AltKategoriId": 54, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 3999, "KumasHedefMaliyet": 4.21, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 1.57},
    {"MarkaId": 8, "AltKategoriId": 54, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.58, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 1.57},
    {"MarkaId": 8, "AltKategoriId": 54, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 5999, "KumasHedefMaliyet": 5.49, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1186, "AlimFiyat_USD": 21.56, "Sarf": 1.57},
    {"MarkaId": 8, "AltKategoriId": 54, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 7999, "KumasHedefMaliyet": 7.32, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1581, "AlimFiyat_USD": 28.75, "Sarf": 1.57},
    {"MarkaId": 8, "AltKategoriId": 54, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 10990, "KumasHedefMaliyet": 10.06, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2172, "AlimFiyat_USD": 39.49, "Sarf": 1.57},
    {"MarkaId": 8, "AltKategoriId": 56, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 2299, "KumasHedefMaliyet": 2.35, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 523, "AlimFiyat_USD": 9.51, "Sarf": 1.62},
    {"MarkaId": 8, "AltKategoriId": 56, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 3999, "KumasHedefMaliyet": 3.55, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 790, "AlimFiyat_USD": 14.36, "Sarf": 1.62},
    {"MarkaId": 8, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.6, "SegmentPSF": 2999, "KumasHedefMaliyet": 2.66, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 593, "AlimFiyat_USD": 10.78, "Sarf": 1.62},
    {"MarkaId": 8, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 3999, "KumasHedefMaliyet": 3.55, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 790, "AlimFiyat_USD": 14.36, "Sarf": 1.62},
    {"MarkaId": 8, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.43, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 1.62},
    {"MarkaId": 8, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 5999, "KumasHedefMaliyet": 5.32, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1186, "AlimFiyat_USD": 21.56, "Sarf": 1.62},
    {"MarkaId": 8, "AltKategoriId": 56, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 7999, "KumasHedefMaliyet": 7.1, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1581, "AlimFiyat_USD": 28.75, "Sarf": 1.62},
    {"MarkaId": 8, "AltKategoriId": 43, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 3299, "KumasHedefMaliyet": 4.35, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 652, "AlimFiyat_USD": 11.85, "Sarf": 1.09},
    {"MarkaId": 8, "AltKategoriId": 43, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 4.74, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 1.09},
    {"MarkaId": 8, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.6, "SegmentPSF": 2599, "KumasHedefMaliyet": 3.43, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 514, "AlimFiyat_USD": 9.35, "Sarf": 1.09},
    {"MarkaId": 8, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 3299, "KumasHedefMaliyet": 4.35, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 652, "AlimFiyat_USD": 11.85, "Sarf": 1.09},
    {"MarkaId": 8, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 4.74, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 1.09},
    {"MarkaId": 8, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 6.07, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 1.09},
    {"MarkaId": 8, "AltKategoriId": 43, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 6.59, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 1.09},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 1299, "KumasHedefMaliyet": 1.92, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 394, "AlimFiyat_USD": 7.16, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1499, "KumasHedefMaliyet": 1.66, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 341, "AlimFiyat_USD": 6.2, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2799, "KumasHedefMaliyet": 2.7, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 553, "AlimFiyat_USD": 10.05, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 3.47, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 3999, "KumasHedefMaliyet": 3.86, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 790, "AlimFiyat_USD": 14.36, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.82, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2799, "KumasHedefMaliyet": 2.7, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 553, "AlimFiyat_USD": 10.05, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 3.47, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 58, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.44, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 1.49},
    {"MarkaId": 8, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1399, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 318, "AlimFiyat_USD": 5.78, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 514, "AlimFiyat_USD": 9.35, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 44, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 44, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 2999, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 593, "AlimFiyat_USD": 10.78, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 44, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 49, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 9999, "KumasHedefMaliyet": 6.88, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1976, "AlimFiyat_USD": 35.93, "Sarf": 2.09},
    {"MarkaId": 8, "AltKategoriId": 49, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 10990, "KumasHedefMaliyet": 7.56, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2172, "AlimFiyat_USD": 39.49, "Sarf": 2.09},
    {"MarkaId": 8, "AltKategoriId": 49, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.6, "SegmentPSF": 6999, "KumasHedefMaliyet": 4.81, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1383, "AlimFiyat_USD": 25.15, "Sarf": 2.09},
    {"MarkaId": 8, "AltKategoriId": 49, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 7999, "KumasHedefMaliyet": 5.5, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1581, "AlimFiyat_USD": 28.75, "Sarf": 2.09},
    {"MarkaId": 8, "AltKategoriId": 49, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 9999, "KumasHedefMaliyet": 6.88, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1976, "AlimFiyat_USD": 35.93, "Sarf": 2.09},
    {"MarkaId": 8, "AltKategoriId": 49, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 11990, "KumasHedefMaliyet": 8.25, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2370, "AlimFiyat_USD": 43.09, "Sarf": 2.09},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 3999, "KumasHedefMaliyet": 3.78, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1212, "AlimFiyat_USD": 22.04, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.8, "SegmentPSF": 6999, "KumasHedefMaliyet": 4.14, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1326, "AlimFiyat_USD": 24.11, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.8, "SegmentPSF": 7999, "KumasHedefMaliyet": 4.73, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1515, "AlimFiyat_USD": 27.55, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.8, "SegmentPSF": 11990, "KumasHedefMaliyet": 7.09, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2271, "AlimFiyat_USD": 41.29, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 4.8, "SegmentPSF": 12990, "KumasHedefMaliyet": 7.68, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2460, "AlimFiyat_USD": 44.73, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.8, "SegmentPSF": 4999, "KumasHedefMaliyet": 2.96, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 947, "AlimFiyat_USD": 17.22, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.8, "SegmentPSF": 6999, "KumasHedefMaliyet": 4.14, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1326, "AlimFiyat_USD": 24.11, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.8, "SegmentPSF": 9999, "KumasHedefMaliyet": 5.91, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1894, "AlimFiyat_USD": 34.44, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.8, "SegmentPSF": 10990, "KumasHedefMaliyet": 6.5, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2081, "AlimFiyat_USD": 37.84, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 51, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.8, "SegmentPSF": 12990, "KumasHedefMaliyet": 7.68, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2460, "AlimFiyat_USD": 44.73, "Sarf": 2.33},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 1499, "KumasHedefMaliyet": 2.43, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 454, "AlimFiyat_USD": 8.25, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1799, "KumasHedefMaliyet": 2.19, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 409, "AlimFiyat_USD": 7.44, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.2, "SegmentPSF": 2799, "KumasHedefMaliyet": 3.24, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 606, "AlimFiyat_USD": 11.02, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.2, "SegmentPSF": 3599, "KumasHedefMaliyet": 4.16, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 779, "AlimFiyat_USD": 14.16, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.2, "SegmentPSF": 4599, "KumasHedefMaliyet": 5.32, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 995, "AlimFiyat_USD": 18.09, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.2, "SegmentPSF": 2999, "KumasHedefMaliyet": 3.47, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 649, "AlimFiyat_USD": 11.8, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.2, "SegmentPSF": 3599, "KumasHedefMaliyet": 4.16, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 779, "AlimFiyat_USD": 14.16, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.2, "SegmentPSF": 4599, "KumasHedefMaliyet": 5.32, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 995, "AlimFiyat_USD": 18.09, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 47, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.2, "SegmentPSF": 4999, "KumasHedefMaliyet": 5.79, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1082, "AlimFiyat_USD": 19.67, "Sarf": 1.36},
    {"MarkaId": 8, "AltKategoriId": 53, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.6, "SegmentPSF": 5999, "KumasHedefMaliyet": 3.61, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1186, "AlimFiyat_USD": 21.56, "Sarf": 2.39},
    {"MarkaId": 8, "AltKategoriId": 53, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 6999, "KumasHedefMaliyet": 4.21, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1383, "AlimFiyat_USD": 25.15, "Sarf": 2.39},
    {"MarkaId": 8, "AltKategoriId": 53, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 9999, "KumasHedefMaliyet": 6.01, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1976, "AlimFiyat_USD": 35.93, "Sarf": 2.39},
    {"MarkaId": 8, "AltKategoriId": 83, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2799, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 553, "AlimFiyat_USD": 10.05, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 83, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 2299, "KumasHedefMaliyet": 2.45, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 523, "AlimFiyat_USD": 9.51, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 3299, "KumasHedefMaliyet": 3.06, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 652, "AlimFiyat_USD": 11.85, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 3.34, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.27, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.6, "SegmentPSF": 2799, "KumasHedefMaliyet": 2.59, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 553, "AlimFiyat_USD": 10.05, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 3299, "KumasHedefMaliyet": 3.06, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 652, "AlimFiyat_USD": 11.85, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 3.34, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 4.27, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 84, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 4.63, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 1.55},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 599, "KumasHedefMaliyet": 1.7, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 182, "AlimFiyat_USD": 3.31, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 699, "KumasHedefMaliyet": 1.48, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 159, "AlimFiyat_USD": 2.89, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 859, "KumasHedefMaliyet": 1.58, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 170, "AlimFiyat_USD": 3.09, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 1499, "KumasHedefMaliyet": 2.76, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 296, "AlimFiyat_USD": 5.38, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 1999, "KumasHedefMaliyet": 3.68, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 395, "AlimFiyat_USD": 7.18, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 10, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 2799, "KumasHedefMaliyet": 5.15, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 553, "AlimFiyat_USD": 10.05, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 1199, "KumasHedefMaliyet": 2.21, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 237, "AlimFiyat_USD": 4.31, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 1599, "KumasHedefMaliyet": 2.95, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 316, "AlimFiyat_USD": 5.75, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 2299, "KumasHedefMaliyet": 4.23, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 454, "AlimFiyat_USD": 8.25, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 60, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 2999, "KumasHedefMaliyet": 5.53, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 593, "AlimFiyat_USD": 10.78, "Sarf": 0.78},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 8, "SegmentId": 1, "MU": 3.0, "SegmentPSF": 1399, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 424, "AlimFiyat_USD": 7.71, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 1, "MU": 4.0, "SegmentPSF": 1399, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 318, "AlimFiyat_USD": 5.78, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 514, "AlimFiyat_USD": 9.35, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3299, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 652, "AlimFiyat_USD": 11.85, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 10, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.6, "SegmentPSF": 1799, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 356, "AlimFiyat_USD": 6.47, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 2599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 514, "AlimFiyat_USD": 9.35, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 3599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 711, "AlimFiyat_USD": 12.93, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 4599, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 909, "AlimFiyat_USD": 16.53, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 61, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 0.0, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 0.0},
    {"MarkaId": 8, "AltKategoriId": 82, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 3999, "KumasHedefMaliyet": 3.17, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 790, "AlimFiyat_USD": 14.36, "Sarf": 1.81},
    {"MarkaId": 8, "AltKategoriId": 82, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 3.97, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 1.81},
    {"MarkaId": 8, "AltKategoriId": 55, "LifeStyleGrupId": 12, "SegmentId": 1, "MU": 4.6, "SegmentPSF": 3799, "KumasHedefMaliyet": 8.67, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 751, "AlimFiyat_USD": 13.65, "Sarf": 0.63},
    {"MarkaId": 8, "AltKategoriId": 55, "LifeStyleGrupId": 12, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 4999, "KumasHedefMaliyet": 11.4, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 988, "AlimFiyat_USD": 17.96, "Sarf": 0.63},
    {"MarkaId": 8, "AltKategoriId": 55, "LifeStyleGrupId": 12, "SegmentId": 3, "MU": 4.6, "SegmentPSF": 5999, "KumasHedefMaliyet": 13.69, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1186, "AlimFiyat_USD": 21.56, "Sarf": 0.63},
]

# Build decision map for fast lookup
DECISION_MAP = {}
for entry in DECISION_TABLE:
    key = f"{entry['MarkaId']}-{entry['AltKategoriId']}-{entry['SegmentId']}-{entry['LifeStyleGrupId']}"
    DECISION_MAP[key] = entry


def find_decision_values(marka_id, alt_kategori_id, segment_id, life_style_grup_id):
    """
    Find decision values by MarkaId, AltKategoriId, SegmentId, and LifeStyleGrupId
    
    Args:
        marka_id (int): Marka/Brand ID
        alt_kategori_id (int): Alt Kategori/SubCategory ID
        segment_id (int): Segment ID (UserDefinedField5Id)
        life_style_grup_id (int): LifeStyle Grup ID
    
    Returns:
        dict: Decision values with all parameters set to 0 if not found
    """
    key = f"{marka_id}-{alt_kategori_id}-{segment_id}-{life_style_grup_id}"
    result = DECISION_MAP.get(key, None)
    
    if result:
        return result
    else:
        # Return all zeros if not found
        return {
            "MarkaId": marka_id,
            "AltKategoriId": alt_kategori_id,
            "LifeStyleGrupId": life_style_grup_id,
            "SegmentId": segment_id,
            "MU": 0,
            "SegmentPSF": 0,
            "KumasHedefMaliyet": 0,
            "HesaplamaKuru": 0,
            "KDV": 0,
            "AlimFiyat_TRY": 0,
            "AlimFiyat_USD": 0,
            "Sarf": 0
        }


# Example usage for PLM
if __name__ == "__main__":
    # Test: Found case
    result = find_decision_values(4, 102, 2, 10)  # IPEKYOL BLAZER
    print("Test 1 - Found:")
    print(f"  SegmentPSF: {result['SegmentPSF']}")
    print(f"  MU: {result['MU']}")
    print(f"  KumasHedefMaliyet: {result['KumasHedefMaliyet']}")
    print(f"  HesaplamaKuru: {result['HesaplamaKuru']}")
    print()
    
    # Test: Not found case (should return all zeros)
    result2 = find_decision_values(999, 999, 999, 999)
    print("Test 2 - Not Found (should be all zeros):")
    print(f"  SegmentPSF: {result2['SegmentPSF']}")
    print(f"  MU: {result2['MU']}")
    print(f"  KumasHedefMaliyet: {result2['KumasHedefMaliyet']}")
    print(f"  HesaplamaKuru: {result2['HesaplamaKuru']}")
