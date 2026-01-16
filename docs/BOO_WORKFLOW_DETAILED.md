# 🏭 BOO (Bill of Operations) TO COSTING - Detaylı Dokümantasyon

## 📋 Genel Bakış

**Workflow Code:** `UPDATED_STYLE_BOO`  
**Trigger:** PLM'de Style BOO (Bill of Operations) güncellendiğinde  
**Amaç:** BOO operasyon maliyetlerini toplayıp AISC cost element'ini güncellemek ve tüm formüllü alanları yeniden hesaplamak

---

## 🔄 İşlem Akışı

```
1. INPUT: JSON/XML ile StyleId
2. PLM GET: Style BOO + Costing + Suppliers verisi
3. PARSE & VALIDATE: BOO operasyon maliyetleri
4. AISC HESAPLAMA: Code bazlı logic
5. DECISION TABLE LOOKUP: Diğer Type=1 değerler için
6. VRG/NAVL HESAPLAMA: CountryId bazlı (EKSİ: NAVL=1.08)
7. TYPE=3 HESAPLAMA: Tüm formüller
8. EXTENDED FIELDS HESAPLAMA: Decision Table + Type=3
9. PATCH TO PLM: Supplier Values + Extended Fields
10. RESPONSE: 200 (success/error detayları body'de)
```

---

## 📥 INPUT FORMAT

### JSON Format (Yeni)
```json
{
  "workflowdefination": "UPDATED_STYLE_BOO",
  "moduleId": "10596"
}
```

### XML Format (Legacy)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<DataArea>
  <Process>
    <ModuleId>10596</ModuleId>
    <WorkflowDefinitionCode>UPDATED_STYLE_BOO</WorkflowDefinitionCode>
  </Process>
</DataArea>
```

**NOT:** `decisionTableValues` BOO için GEREKLİ DEĞİL (internal lookup kullanılıyor)

---

## 🔍 PLM GET API

**Endpoint:**
```
GET /STYLE?
  $expand=StyleBOO($expand=StyleBOLOperation($select=Id,Cost,Code,Name)),
          STYLECOSTING(...),
          STYLECOSTSUPPLIERS(...),
          STYLEEXTENDEDFIELDVALUES(...)
  &$select=StyleId,StyleCode,BrandId,SubCategoryId,UserDefinedField5Id,RetailPrice,NumericValue2
  &$filter=StyleId eq {moduleId}
```

**Çekilen Veriler:**
- `StyleBOO` → `StyleBOLOperation[]` (Id, Cost, Code, Name)
- `StyleCosting` → Cost elements & supplier values
- `StyleCostSuppliers` → Supplier info + IsLock durumu
- `StyleExtendedFieldValues` → Extended field values & IDs
- `RetailPrice` → RPSF için
- `NumericValue2` → FOB hesaplama için

---

## 🧮 İŞ KURALLARI

### 1. BOO Operasyon Maliyetlerini Toplama

BOO içindeki tüm `StyleBOLOperation` kayıtları taranır:

```javascript
let code1Cost = 0;          // Code="1" operasyonların toplamı
let otherOperationsCost = 0; // Diğer operasyonların toplamı

for (const operation of operations) {
  if (operation.Code === "1") {
    code1Cost += operation.Cost;
  } else {
    otherOperationsCost += operation.Cost;
  }
}
```

**Örnek:**
```
Operation 1: Code="1", Cost=50   → code1Cost += 50
Operation 2: Code="2", Cost=30   → otherOperationsCost += 30
Operation 3: Code="1", Cost=25   → code1Cost += 25
Operation 4: Code="3", Cost=15   → otherOperationsCost += 15

RESULT:
code1Cost = 75
otherOperationsCost = 45
```

---

### 2. AISC Değeri Belirleme (Kritik Logic!)

```javascript
let finalAISC = 0;

if (otherOperationsCost > 0) {
  // Eğer Code≠"1" operasyonların toplamı 0'dan büyükse
  finalAISC = otherOperationsCost;
} else {
  // Eğer sadece Code="1" operasyonlar varsa veya diğerleri 0 ise
  finalAISC = code1Cost;
}
```

**Senaryo Örnekleri:**

| Code="1" Cost | Other Cost | Final AISC | Neden? |
|---------------|------------|------------|--------|
| 75 | 45 | **45** | Other > 0 olduğu için other kullanıldı |
| 100 | 0 | **100** | Other = 0 olduğu için code1 kullanıldı |
| 0 | 30 | **30** | Other > 0 olduğu için other kullanıldı |
| 50 | 0.5 | **0.5** | Other > 0 olduğu için other kullanıldı |
| 0 | 0 | **0** | Her ikisi de 0 |

---

### 3. AISC'yi Tüm Unlocked Suppliers'a Yazma

```javascript
// IsLock=false olan tüm suppliers'ı filtrele
const unlockedSuppliers = styleCostSuppliers.filter(s => !s.isLock);

// AYNI AISC değerini HEPSİNE yaz
for (const supplier of unlockedSuppliers) {
  patchValues.push({
    Id: supplier.aiscValueId,
    Value: finalAISC
  });
}
```

**ÖNEMLI:** Supplier bazlı farklılık YOK, hepsi aynı değeri alır!

---

### 4. Decision Table Lookup (Internal)

BOO workflow'unda decision table değerleri **hala internal lookup** ile alınıyor:

```javascript
const decisionValues = findDecisionValues(
  brandId, 
  subCategoryId, 
  udf5Id, 
  cluster
);
```

**Alınan Değerler:**
- `SegmentPSF`
- `MU`
- `KumaşHedefMaliyet`
- `AlımFiyatı_TRY`
- `AlımFiyatı_USD`
- `HesaplamaKuru` (GKUR)
- `KDV`

**EĞER BULUNAMAZSA:** Error fırlatılır (işlem durur)

---

### 5. VRG & NAVL Hesaplama (Eski Mantık - GÜNCELLEME GEREKLİ!)

```javascript
// ⚠️ EKSİ MANTIK - Sadece CountryId'ye bakıyor
if (supplier.CountryId === 69) {
  VRG = 1;
  NAVL = 1;
} else {
  VRG = 1.38;
  NAVL = 1.08;  // ⚠️ OVERVIEW'da 1.1 ama burada 1.08!
}
```

**SORUN:** 
- BrandId dikkate alınmıyor (OVERVIEW'da yeni mapping var)
- NAVL değeri OVERVIEW'dan farklı (1.08 vs 1.1)

**REVİZE GEREKİR:** `vrgNavlMapping.js` ile tutarlı hale getirilmeli

---

### 6. Type=3 (Formül) Hesaplama

Tüm Type=3 cost elementler için formüller çalıştırılır:

```javascript
const overrideValues = new Map([
  ['AISC', finalAISC],           // BOO'dan gelen
  ['SPSF', decisionValues.SegmentPSF],
  ['MU', decisionValues.MU],
  ['KHDF', decisionValues.KumaşHedefMaliyet],
  ['ALMTRY', decisionValues.AlımFiyatı_TRY],
  ['GKUR', decisionValues.HesaplamaKuru],
  ['KDV', decisionValues.KDV],
  ['VRG', vrgValue],
  ['NAVL', navlValue],
  ['RPSF', retailPrice],          // PLM'den
  ['FOB', numericValue2 * GKUR]   // PLM'den hesaplanan
]);

const calculatedValues = calculateAllFormulas(styleCostElements, overrideValues);
```

**Hesaplanan Type=3 Elementler:**
- `RMU` = SPSF / (FOB × MU)
- `TCOST` = AISC + KHDF + ...
- `RHDF` = TCOST / VRG / NAVL
- `DFOB` = ((FOB / RHDF) - 1) × 100
- `MCOST` = ...
- `TKMS` = ...
- `TAST` = ...
- `TISC` = ...
- `TTRM` = ...
- `TISL` = ...
- `TDGR` = ...

**NOT:** Tüm sonuçlar **2 basamak yuvarlanır**.

---

## 📝 EXTENDED FIELDS

### 1. Decision Table Extended Fields

| Field Name | ExtFldId | Kaynak |
|-----------|----------|--------|
| AlımFiyatı_USD | `daa197bf-717f-4374-9b0c-5a19b8cb2f3a` | Decision Table |
| SegmentPSF | `b63395db-8252-4b69-b0bd-6506738081b6` | Decision Table |
| KumaşHedefMaliyet | `45247062-689a-48ca-a4e3-79324c8cbab3` | Decision Table |
| AlımFiyatı_TRY | `79cb5b20-3028-44d4-a85e-ed18c00af3c8` | Decision Table |

### 2. RHDF-Based Extended Fields

| Field Name | ExtFldId | Formül |
|-----------|----------|--------|
| AlımTarget_USD | `93fa0034-ea93-4649-a2b1-43b905d01a49` | RHDF / GKUR |
| AlımTarget_USD_105 | `b3eeb0c5-f089-441c-a3ff-bfd5697ba30f` | (RHDF / GKUR) / 1.05 |

### 3. Type=3 Extended Fields

| Field Name | ExtFldId | Kaynak |
|-----------|----------|--------|
| TKMS | `14a52574-591e-4082-83e7-6a401808b726` | Type=3 Cost Element |
| TAST | `c645f6f2-d537-4234-87c1-7675677ffb86` | Type=3 Cost Element |
| TISC | `a28b4eca-999c-4437-bb49-7fda0284993c` | Type=3 Cost Element |
| TTRM | `556a9af5-6350-4bce-ae83-f1453ec3659b` | Type=3 Cost Element |
| TISL | `40ea5b12-832b-41e9-aefb-e547d1e6884b` | Type=3 Cost Element |
| TDGR | `bc11923a-8594-4f22-b2bb-ab7f5f558ba7` | Type=3 Cost Element |

**PATCH KURALI:** Value=0 olan extended fieldlar PATCH edilmez (skip)

---

## 💾 PATCH OPERATIONS

### 1. PATCH StyleCostingSupplierValue

**Endpoint:** `PATCH /STYLECOSTINGSUPPLIERVALUE`

**Payload Format:**
```json
[
  {
    "Id": 4955,
    "Value": 45.5
  },
  {
    "Id": 4970,
    "Value": 1.4
  }
]
```

**Patch Edilen Cost Elements:**
- `AISC` → finalAISC (tüm unlocked suppliers)
- Tüm Type=3 elementler (calculated values)

### 2. PATCH StyleExtendedFieldValue

**Endpoint:** `PATCH /STYLEEXTENDEDFIELDVALUE` (tek tek)

**Payload Format:**
```json
[
  {
    "Id": 196065,
    "NumberValue": "14.83"  // ⚠️ String olmalı!
  }
]
```

**Patch Edilen Extended Fields:**
- Decision Table fields (7 adet)
- RHDF-based fields (2 adet)
- Type=3 mapped fields (6 adet)

---

## ⚠️ ÖZEL DURUMLAR & HATA YÖNETİMİ

### 1. BOO Operasyon Bulunamadığında
```javascript
// code1Cost = 0, otherOperationsCost = 0
// finalAISC = 0 (devam eder)
```

### 2. Decision Table Bulunamadığında
```javascript
throw new Error('No matching decision table entry found');
// → İşlem durur, error response döner
```

### 3. AISC Cost Element Bulunamadığında
```javascript
console.warn('AISC cost element not found (skipping)');
// → AISC patch edilmez, diğer işlemler devam eder
```

### 4. Extended Field Bulunamadığında
```javascript
// Skip edilir, hata fırlatılmaz
// → Diğer extended fieldlar patch edilir
```

### 5. Unlocked Supplier Bulunamadığında
```javascript
throw new Error('No unlocked suppliers found');
// → İşlem durur, error response döner
```

---

## 📊 RESPONSE FORMAT

### Success Response
```json
{
  "success": true,
  "workflow": "BOO_TO_COSTING",
  "styleId": "10596",
  "booOperationsCount": 5,
  "calculatedData": {
    "StyleId": 10596,
    "BrandId": 4,
    "supplierValues": [
      {
        "Id": 4955,
        "Value": 45.5,
        "elementCode": "AISC",
        "supplierId": 120
      }
    ]
  },
  "patchResults": {
    "styleCostingSupplierValue": "PATCH successful",
    "styleExtendedFieldValues": "PATCH successful"
  },
  "message": "BOO costing calculation and PATCH completed successfully",
  "timestamp": "2026-01-16T00:28:06.741Z"
}
```

### Error Response (Her zaman 200!)
```json
{
  "success": false,
  "errorCode": "BOO_TO_COSTING_ERROR",
  "error": "No matching decision table entry found",
  "message": "Error processing BOO_TO_COSTING workflow",
  "styleId": "10596",
  "timestamp": "2026-01-16T00:28:06.741Z"
}
```

---

## 🔧 REVİZE ÖNERİLERİ (OVERVIEW ile Tutarlılık için)

### 1. VRG/NAVL Mapping
```diff
- // Eski mantık
- const vrgValue = countryId === 69 ? 1 : 1.38;
- const navlValue = countryId === 69 ? 1 : 1.08;

+ // Yeni mantık (OVERVIEW ile aynı)
+ const { findVrgNavl } = require('../config/vrgNavlMapping');
+ const vrgNavlValues = findVrgNavl(countryId, brandId);
```

### 2. Decision Table Input'tan Alma (Opsiyonel)
```diff
- const decisionValues = findDecisionValues(brandId, subCategoryId, udf5Id, cluster);

+ // Input'tan gelmesi durumunda
+ const decisionValues = inputDecisionValues || 
+   findDecisionValues(brandId, subCategoryId, udf5Id, cluster);
```

### 3. Extended Fields ION'a Taşıma (Opsiyonel)
```diff
+ /* EXTENDED FIELDS PATCH - DISABLED (handled by ION)
  await patchStyleExtendedFieldValues(calculatedData);
+ END DISABLED */
```

---

## 📝 TEST SENARYOLARI

### Test 1: Normal BOO Flow
```json
{
  "workflowdefination": "UPDATED_STYLE_BOO",
  "moduleId": "10596"
}
```
**Beklenen:** AISC hesaplanır, tüm formüller çalışır, PATCH başarılı

### Test 2: Sadece Code="1" Operasyonlar
```
Operations: [
  { Code: "1", Cost: 100 },
  { Code: "1", Cost: 50 }
]
```
**Beklenen:** finalAISC = 150 (code1Cost kullanılır)

### Test 3: Code="1" + Diğer Operasyonlar
```
Operations: [
  { Code: "1", Cost: 75 },
  { Code: "2", Cost: 30 },
  { Code: "3", Cost: 15 }
]
```
**Beklenen:** finalAISC = 45 (otherOperationsCost kullanılır)

### Test 4: Decision Table Bulunamaz
```
BrandId=999, SubCategoryId=999
```
**Beklenen:** Error response (200 status ile)

---

## 🏁 SON DURUM

| Özellik | Durum | Not |
|---------|-------|-----|
| BOO Operations Parse | ✅ Aktif | Code bazlı ayrıştırma |
| AISC Logic | ✅ Aktif | Basitleştirilmiş mantık |
| Decision Table | ⚠️ Internal Lookup | OVERVIEW'da input'tan |
| VRG/NAVL | ⚠️ Eski Mantık | OVERVIEW'da yeni mapping |
| Type=3 Calculation | ✅ Aktif | Tüm formüller |
| Extended Fields | ✅ Aktif | Patch ediliyor |
| Supplier Values PATCH | ✅ Aktif | Unlocked suppliers |
| Extended Fields PATCH | ✅ Aktif | Tek tek patch |

**REVİZE PLANLANIYOR:** VRG/NAVL mapping ve decision table input alignment

---

**Hazırlayan:** AI Assistant  
**Tarih:** 2026-01-16  
**Versiyon:** 1.0
