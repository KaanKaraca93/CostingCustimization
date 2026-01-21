# KDV Mapping by UrunAltGrup
# Input: UrunAltGrup (string)
# Output: KDV (string)
# Default: "10" if not found

def get_kdv_by_urunaltgrup(UrunAltGrup):
    """
    Returns KDV value based on UrunAltGrup
    
    Args:
        UrunAltGrup (str): Product sub-category code
        
    Returns:
        str: KDV value as string ("10" or "20")
    """
    
    # KDV Mapping Dictionary
    kdv_mapping = {
        "Koz": "10",
        "094": "10",  # BAVUL
        "045": "20",  # GOMLEK
        "096": "20",  # SAAT
        "047": "20",  # SEMSIYE
        "073": "10",  # PAREO
        "041": "10",  # PLAJ HAVLUSU
        "072": "10",  # ANAHTARLIK
        "041": "20",  # BILEKLIK
        "037": "20",  # BROS
        "041": "20",  # KOLYE
        "039": "20",  # KUPE
        "076": "20",  # TOKA
        "040": "20",  # YUZUK
        "067": "10",  # ATKI
        "063": "10",  # BERE
        "069": "10",  # COBAP
        "066": "10",  # ELDIVEN
        "077": "10",  # SAPKA
        "068": "10",  # YAK
        "032": "10",  # BABET
        "030": "10",  # DUZAYAKKABI
        "031": "10",  # TOPUKLU AYAKKABI
        "034": "10",  # BOT
        "035": "10",  # CIZME
        "033": "10",  # SANDALET
        "037": "10",  # TERLIK
        "004": "10",  # ETEK
        "018": "10",  # JEAN PANTOLON
        "162": "10",  # ORME ATLET
        "026": "10",  # TAYT
        "008": "10",  # KABAN
        "019": "10",  # MONTO
        "005": "10",  # CEKET
        "002": "10",  # HIRKA
        "006": "10",  # BLUZ
        "003": "10",  # PANTOLON
        "050": "10",  # KAZAK
        "011": "10",  # YELEK
        "081": "10",  # PARKA
        "090": "10",  # SORT
        "074": "20",  # TELEFON KILIFI
        "013": "10",  # SORU
        "097": "10",  # KULAKLIK
        "075": "10",  # LAPTOP KILIFI
        "079": "10",  # PANCO
        "048": "20",  # HANAL
        "069": "20",  # TERMOS
        "085": "10",  # KAP
        "062": "10",  # SNEAKER
        "147": "10",  # SORT ETEK
        "149": "10",  # BODYMARK
        "091": "10",  # SWEATSHIRT
        "031": "10",  # TAYT
        "070": "10",  # TISORT
        "076": "20",  # MAYO
        "024": "20",  # GOZLUK (P)
        "023": "20",  # SAC BANDI
        "022": "20",  # TELEFON TUTACAGI
        "020": "20",  # TELEFON KARTLIGI
        "101": "10",  # KIMONO
        "162": "20",  # GERDANLIK
        "106": "10",  # BLAZER
        "108": "20",  # ELAYET LOSYONU
        "109": "20",  # SIVI SABUN
        "110": "20",  # KATI SABUN
        "111": "20",  # CUBUKLU ODA KOKUSU
        "027": "20",  # MUM
        "038": "10",  # BIKINI TAKIM
        "054": "10",  # MAYO
        "019": "10",  # PLAJ ELBISE
        "114": "20",  # ESARP YUZUGU
        "116": "20",  # EL TEMIZLEYICI
        "117": "20",  # TRAVEL SET
        "118": "20",  # KOKU CUBUGU
        "065": "10",  # FILAR-SAL
        "002": "10",  # ESARP
        "052": "10",  # CANTA
        "119": "10",  # SIRT CANTASI
        "120": "10",  # BEL CANTASI
        "121": "10",  # CLUTCH
        "071": "20",  # CUZDAN
        "048": "20",  # EL CANTASI
        "122": "20",  # TAXI SET
        "123": "10",  # MUMU SET
        "124": "20",  # SAC AKSESUARI
        "125": "20",  # KOLONYALI ISLAK KREMI
        "126": "20",  # MUM / ODA KOKUSU
        "112": "20",  # KOLONYA
        "127": "10",  # KUPE
        "128": "20",  # MINI MUM
        "129": "20",  # AHSAP UFAK ESENDIRICI
        "130": "10",  # BUSTIYER
        "132": "20",  # HAT
        "133": "20",  # KOZMETIK CANTASI
        "134": "10",  # DEFTER-KILIFI
        "135": "10",  # PASAPORT KILIFI
        "136": "20",  # BAVUL ETIKETI
        "137": "10",  # BATTANIYE
        "138": "20",  # IS SIPERAL
        "068": "20",  # PARFUM
        "139": "20",  # SET KOKU
        "140": "10",  # HAVLU
        "141": "20",  # BANDANA
        "142": "10",  # LAPTOP CANTASI
        "144": "20",  # BILEK KIRILIGI
        "143": "20",  # HATARA AKSESUARI
        "145": "20",  # EL KREMI SETI
        "146": "20",  # GOZLUK KABI
        "161": "10",  # TOKA ATLET
        "001": "10",  # ELBISE
        "148": "10",  # GOMLEK CEKET
        "007": "10",  # YELEK
        "025": "10",  # GOMLEK
        "163": "10",  # ETEK
        "016": "10",  # TUNIK
        "160": "20"   # ELBISE
    }
    
    # Return KDV value or default "10" if not found
    KDV = kdv_mapping.get(UrunAltGrup, "10")
    
    return KDV


# ============================================
# MAIN EXECUTION (for PLM)
# ============================================
# PLM will call this script with UrunAltGrup variable
# and expect KDV as output

# Example usage:
# UrunAltGrup = "094"  # BAVUL
# KDV = get_kdv_by_urunaltgrup(UrunAltGrup)
# print(KDV)  # Output: "10"

# For PLM integration, call the function:
KDV = get_kdv_by_urunaltgrup(UrunAltGrup)
