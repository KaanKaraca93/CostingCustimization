"""
Complete Decision Table Script for PLM
All code in one file - no imports needed
"""

# ==========================================
# DECISION TABLE DATA (244 entries)
# ==========================================
DECISION_TABLE = [
    {"MarkaId": 4, "AltKategoriId": 102, "LifeStyleGrupId": 10, "SegmentId": 2, "MU": 4.6, "SegmentPSF": 5999, "KumasHedefMaliyet": 4.4, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 1186, "AlimFiyat_USD": 21.56, "Sarf": 1.96},
    {"MarkaId": 4, "AltKategoriId": 102, "LifeStyleGrupId": 12, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 10990, "KumasHedefMaliyet": 8.06, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2172, "AlimFiyat_USD": 39.49, "Sarf": 1.96},
    {"MarkaId": 4, "AltKategoriId": 102, "LifeStyleGrupId": 12, "SegmentId": 5, "MU": 4.6, "SegmentPSF": 13990, "KumasHedefMaliyet": 10.26, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2765, "AlimFiyat_USD": 50.27, "Sarf": 1.96},
    {"MarkaId": 4, "AltKategoriId": 102, "LifeStyleGrupId": 6, "SegmentId": 4, "MU": 4.6, "SegmentPSF": 11990, "KumasHedefMaliyet": 8.79, "HesaplamaKuru": 55, "KDV": 0.1, "AlimFiyat_TRY": 2370, "AlimFiyat_USD": 43.09, "Sarf": 1.96},
]
# ... Add all 244 rows here (truncated for readability)

# Build lookup map
DECISION_MAP = {}
for entry in DECISION_TABLE:
    key = f"{entry['MarkaId']}-{entry['AltKategoriId']}-{entry['SegmentId']}-{entry['LifeStyleGrupId']}"
    DECISION_MAP[key] = entry

# ==========================================
# MAIN LOGIC
# ==========================================

# Get input values from PLM
marka_id = MarkaId
alt_kategori_id = AltKategoriId
segment_id = SegmentId
lifestyle_grup_id = LifeStyleGrupId

# Create lookup key
key = f"{marka_id}-{alt_kategori_id}-{segment_id}-{lifestyle_grup_id}"

# Find in decision table
result = DECISION_MAP.get(key, None)

if result:
    # Found - assign values to output variables
    AlimFiyat_TRY = result['AlimFiyat_TRY']
    AlimFiyat_USD = result['AlimFiyat_USD']
    HesaplamaKuru = result['HesaplamaKuru']
    KumasHedefMaliyet = result['KumasHedefMaliyet']
    MU = result['MU']
    SegmentPSF = result['SegmentPSF']
    KDV = result['KDV']
else:
    # Not found - return zeros
    AlimFiyat_TRY = 0
    AlimFiyat_USD = 0
    HesaplamaKuru = 0
    KumasHedefMaliyet = 0
    MU = 0
    SegmentPSF = 0
    KDV = 0

# Debug log
print(f"Lookup Key: {key}")
print(f"Found: {result is not None}")
print(f"SegmentPSF: {SegmentPSF}")
