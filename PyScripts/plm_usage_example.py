"""
PLM Script Example - Decision Table Usage
Bu script PLM içinde çalıştırılacak
"""

from decision_table import find_decision_values

# ========================================
# INPUT: PLM'den gelen değerler
# ========================================
# Bu değerler PLM tarafından otomatik olarak sağlanacak
# Aşağıdaki değerler örnek input variable'lardan gelir

# Input Variables (from PLM):
marka_id = MarkaId              # Integer
alt_kategori_id = AltKategoriId # Integer
segment_id = SegmentId          # Integer
lifestyle_grup_id = LifeStyleGrupId # Integer

# ========================================
# PROCESS: Decision Table Lookup
# ========================================
result = find_decision_values(marka_id, alt_kategori_id, segment_id, lifestyle_grup_id)

# ========================================
# OUTPUT: PLM'e dönen değerler
# ========================================
# Bu değerler PLM'in output variable'larına atanacak

# Output Variables (to PLM):
AlimFiyat_TRY = result['AlimFiyat_TRY']          # Number
AlimFiyat_USD = result['AlimFiyat_USD']          # Number
HesaplamaKuru = result['HesaplamaKuru']          # Number
KumasHedefMaliyet = result['KumasHedefMaliyet']  # Number
MU = result['MU']                                # Number
SegmentPSF = result['SegmentPSF']                # Number

# ========================================
# LOG: Debug için (opsiyonel)
# ========================================
print(f"Input: MarkaId={marka_id}, AltKategoriId={alt_kategori_id}, SegmentId={segment_id}, LifeStyleGrupId={lifestyle_grup_id}")
print(f"Output: SegmentPSF={SegmentPSF}, MU={MU}, HesaplamaKuru={HesaplamaKuru}")
print(f"Found in table: {result['HesaplamaKuru'] > 0}")  # 0 ise bulunamadı demektir
