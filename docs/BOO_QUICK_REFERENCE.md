# 🏭 BOO WORKFLOW - Hızlı Referans

## 📌 Temel Bilgiler
- **Workflow Code:** `UPDATED_STYLE_BOO`
- **Trigger:** Style BOO (Bill of Operations) güncellemesi
- **Ana Görev:** BOO maliyetlerini AISC'ye yaz, formülleri hesapla

---

## 🔢 AISC Hesaplama Mantığı

```
Code="1" operasyonların toplamı → code1Cost
Diğer operasyonların toplamı → otherOperationsCost

IF (otherOperationsCost > 0):
    AISC = otherOperationsCost
ELSE:
    AISC = code1Cost
```

**Örnekler:**
- Code1=75, Other=45 → **AISC=45** ✅
- Code1=100, Other=0 → **AISC=100** ✅
- Code1=0, Other=30 → **AISC=30** ✅

---

## 📊 Veri Akışı

```
INPUT (JSON)
    ↓
PLM GET (BOO + Costing + Suppliers)
    ↓
BOO Operations Parse (Code bazlı)
    ↓
AISC Calculation (Logic)
    ↓
Decision Table Lookup (Internal - BrandId/SubCategoryId/UDF5/Cluster)
    ↓
VRG/NAVL (CountryId=69 → 1, else → 1.38/1.08)
    ↓
Type=3 Formulas (AISC + Decision Values)
    ↓
Extended Fields (Decision + RHDF + Type=3)
    ↓
PATCH (Supplier Values + Extended Fields)
    ↓
RESPONSE (200 - success/error in body)
```

---

## ⚙️ Mevcut Durum

| Özellik | Durum |
|---------|-------|
| AISC Logic | ✅ Basitleştirilmiş (Other > 0 ise other, yoksa code1) |
| Decision Table | ⚠️ **Internal lookup** (OVERVIEW'da input'tan) |
| VRG/NAVL | ⚠️ **Eski mantık** (OVERVIEW'da yeni mapping) |
| Extended Fields | ✅ **Patch ediliyor** (OVERVIEW'da ION yapıyor) |

---

## 🔴 OVERVIEW ile Farklar

| Özellik | OVERVIEW | BOO |
|---------|----------|-----|
| Decision Table | ✅ Input'tan | ⚠️ Internal lookup |
| VRG/NAVL | ✅ Yeni mapping (CountryId+BrandId) | ⚠️ Eski mantık (sadece CountryId) |
| NAVL Default | 1.1 | **1.08** 🚨 |
| Extended Fields Patch | ❌ ION yapıyor | ✅ Heroku yapıyor |
| Cluster | Optional | Optional |

---

## 🎯 Input Format

```json
{
  "workflowdefination": "UPDATED_STYLE_BOO",
  "moduleId": "10596"
}
```

**NOT:** `decisionTableValues` BOO'da kullanılmıyor (şimdilik)

---

## 📝 PATCH Edilen Veriler

### Supplier Values (STYLECOSTINGSUPPLIERVALUE)
- AISC (same value for all unlocked suppliers)
- RMU, TCOST, RHDF, DFOB, MCOST (Type=3)
- TKMS, TAST, TISC, TTRM, TISL, TDGR (Type=3)

### Extended Fields (STYLEEXTENDEDFIELDVALUE)
- AlımFiyatı_USD, SegmentPSF, KumaşHedefMaliyet, AlımFiyatı_TRY
- AlımTarget_USD, AlımTarget_USD_105
- TKMS, TAST, TISC, TTRM, TISL, TDGR

---

## 🔧 Revize İhtiyacı

1. **VRG/NAVL Mapping** → OVERVIEW ile aynı yapılmalı (CountryId + BrandId)
2. **NAVL Değeri** → 1.08'den 1.1'e güncellenebilir
3. **Decision Table** → Input'tan alma seçeneği eklenebilir
4. **Extended Fields** → ION'a taşınabilir (OVERVIEW gibi)

---

## ⚠️ Önemli Notlar

- Her zaman **200 status** döner (error bile olsa)
- AISC **tüm unlocked suppliers'a aynı değer** yazılır
- Extended field value=0 ise **patch edilmez** (skip)
- Decision table bulunamazsa **işlem durur** (error)
- Tüm sonuçlar **2 basamak yuvarlanır**

---

**Son Güncelleme:** 2026-01-16
