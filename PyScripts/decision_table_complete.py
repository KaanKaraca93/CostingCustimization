"""
Decision Table for Costing Calculations - PLM Python Script
Updated: 2026-02-02
Total Entries: 402
Lookup by: MarkaId, AltKategoriId, SegmentId, LifeStyleGrupId

INPUT VARIABLES:
- MarkaId (Integer)
- AltKategoriId (Integer)
- SegmentId (Integer)
- LifeStyleGrupId (Integer)
- PSF (String) - Comes from input
- Cost1 (String) - Optional cost input

OUTPUT VARIABLES:
- AlimFiyat_TRY (Number) - Calculated or from Cost1 (rounded to 2 decimals)
- Cost2 (Number) - Calculated from AlimFiyat_TRY (rounded to 2 decimals)
- HedefYd (Number) - Calculated based on MarkaId (rounded to 2 decimals)
- HesaplamaKuru (Number) - From decision table
- KDV (Number) - From decision table
- KumasHedefMaliyet (Number) - Calculated (rounded to 2 decimals)
- MU (Number) - From decision table
- SegmentPSF (Number) - From decision table

CALCULATION LOGIC:

Scenario 1: PSF exists, Cost1 = 0
1. AlimFiyat_TRY = round((PSF / (1 + KDV)) / MU, 2)
2. Cost2 = round(AlimFiyat_TRY / HesaplamaKuru, 2)
3. KumasHedefMaliyet = round((Cost2 * 0.4) / Sarf, 2)
4. HedefYd (rounded to 2 decimals):
   - If MarkaId = 4: Cost2 / 1.38 / 1.1
   - If MarkaId = 8: Cost2 / 1.51 / 1.1

Scenario 2: Cost1 > 0
1. AlimFiyat_TRY = round(Cost1, 2)
2. Cost2 = round(AlimFiyat_TRY / HesaplamaKuru, 2)
3. KumasHedefMaliyet = round((Cost2 * 0.4) / Sarf, 2)
4. HedefYd (rounded to 2 decimals):
   - If MarkaId = 4: Cost2 / 1.38 / 1.1
   - If MarkaId = 8: Cost2 / 1.51 / 1.1
"""

# Decision table data will be inserted here by user
DECISION_TABLE = [
    # User will paste the formatted data here
]


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

# Convert PSF and Cost1 from string to float (handle empty strings)
try:
    psf_value = float(PSF) if PSF and PSF.strip() else 0
except:
    psf_value = 0

try:
    cost1_value = float(Cost1) if Cost1 and Cost1.strip() else 0
except:
    cost1_value = 0

# Create lookup key
key = f"{marka_id}-{alt_kategori_id}-{segment_id}-{lifestyle_grup_id}"

# Find in decision table
result = DECISION_MAP.get(key, None)

if result:
    # Found match in decision table
    # Get values from table
    mu = result['MU']
    kdv = result['KDV']
    hesaplama_kuru = result['HesaplamaKuru']
    sarf = result['Sarf']
    segment_psf_value = result['SegmentPSF']
    
    # Output SegmentPSF from table
    SegmentPSF = segment_psf_value
    MU = mu
    KDV = kdv
    HesaplamaKuru = hesaplama_kuru
    
    # SCENARIO 1: PSF exists, Cost1 = 0
    if psf_value > 0 and cost1_value == 0:
        # Calculate AlimFiyat_TRY from PSF (rounded to 2 decimals)
        AlimFiyat_TRY = round((psf_value / (1 + kdv)) / mu, 2)
        
    # SCENARIO 2: Cost1 > 0
    elif cost1_value > 0:
        # Use Cost1 directly as AlimFiyat_TRY (rounded to 2 decimals)
        AlimFiyat_TRY = round(cost1_value, 2)
        
    else:
        # Neither PSF nor Cost1 provided
        AlimFiyat_TRY = 0
    
    # Calculate Cost2 (rounded to 2 decimals)
    if AlimFiyat_TRY > 0:
        Cost2 = round(AlimFiyat_TRY / hesaplama_kuru, 2)
    else:
        Cost2 = 0
    
    # Calculate KumasHedefMaliyet (rounded to 2 decimals)
    if Cost2 > 0 and sarf > 0:
        KumasHedefMaliyet = round((Cost2 * 0.4) / sarf, 2)
    else:
        KumasHedefMaliyet = 0
    
    # Calculate HedefYd based on MarkaId (rounded to 2 decimals)
    if Cost2 > 0:
        if marka_id == 4:
            HedefYd = round(Cost2 / 1.38 / 1.1, 2)
        elif marka_id == 8:
            HedefYd = round(Cost2 / 1.51 / 1.1, 2)
        else:
            # Default calculation for other brands
            HedefYd = round(Cost2 / 1.38 / 1.1, 2)
    else:
        HedefYd = 0

else:
    # Not found in decision table - return zeros
    AlimFiyat_TRY = 0
    Cost2 = 0
    HedefYd = 0
    HesaplamaKuru = 0
    KDV = 0
    KumasHedefMaliyet = 0
    MU = 0
    SegmentPSF = 0

