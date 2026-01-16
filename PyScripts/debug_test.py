# DEBUG SCRIPT - PLM'de Input Variables Test
# Bu script sadece input değerlerini yazdırır

# PLM input variables
print("=== INPUT VALUES ===")
print(f"MarkaId: {MarkaId}")
print(f"AltKategoriId: {AltKategoriId}")
print(f"SegmentId: {SegmentId}")
print(f"LifeStyleGrupId: {LifeStyleGrupId}")
print("")

# Simple test  
test_key = f"{MarkaId}-{AltKategoriId}-{SegmentId}-{LifeStyleGrupId}"
print(f"Lookup Key: {test_key}")
print("")

# Manual test for known value
if MarkaId == 4 and AltKategoriId == 102 and SegmentId == 2 and LifeStyleGrupId == 10:
    print("✓ MATCH FOUND in decision table!")
    print("Expected values:")
    print("  SegmentPSF: 5999")
    print("  MU: 4.6")
    print("  KumasHedefMaliyet: 4.4")
    print("  HesaplamaKuru: 55")
    
    # Set outputs manually for test
    AlimFiyat_TRY = 1186
    AlimFiyat_USD = 21.56
    HesaplamaKuru = 55
    KumasHedefMaliyet = 4.4
    MU = 4.6
    SegmentPSF = 5999
    print("")
    print("=== OUTPUT VALUES SET ===")
else:
    print("✗ NO MATCH - Set values to 0")
    AlimFiyat_TRY = 0
    AlimFiyat_USD = 0
    HesaplamaKuru = 0
    KumasHedefMaliyet = 0
    MU = 0
    SegmentPSF = 0
