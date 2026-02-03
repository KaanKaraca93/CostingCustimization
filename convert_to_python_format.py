import json

# Read the JSON file
with open('decision_table_data_temp.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create Python list format
output = "DECISION_DATA = [\n"

for i, row in enumerate(data):
    output += "    {\n"
    output += f"        'MarkaId': {int(row['MarkaId'])},\n"
    output += f"        'AltKategoriId': {int(row['AltKategoriId'])},\n"
    output += f"        'SegmentId': {int(row['SegmentId'])},\n"
    output += f"        'LifeStyleGrupId': {int(row['LifeStyleGrupId'])},\n"
    output += f"        'MU': {round(row['MU'], 2)},\n"
    output += f"        'SegmentPSF': {int(row['SegmentPSF'])},\n"
    output += f"        'KumasHedefMaliyet': {round(row['KumaşHedefMaliyet'], 2)},\n"
    output += f"        'HesaplamaKuru': {int(row['HesaplamaKuru'])},\n"
    output += f"        'KDV': {round(row['KDV'], 2)},\n"
    output += f"        'AlimFiyat_TRY': {int(row['AlımFiyatı_TRY'])},\n"
    output += f"        'AlimFiyat_USD': {round(row['AlımFiyatı_USD'], 2)},\n"
    output += f"        'Sarf': {round(row['Sarf'], 2)}\n"
    
    if i < len(data) - 1:
        output += "    },\n"
    else:
        output += "    }\n"

output += "]\n"

# Save to file
with open('DECISION_DATA_FORMATTED.txt', 'w', encoding='utf-8') as f:
    f.write(output)

print(f">> {len(data)} kayit Python formatina donusturuldu!")
print(f">> Dosya 'DECISION_DATA_FORMATTED.txt' olarak kaydedildi")
print(f"\nIlk 3 kayit:")
print("=" * 80)

# Print first 3 records for preview
temp_output = "DECISION_DATA = [\n"
for i in range(min(3, len(data))):
    row = data[i]
    temp_output += "    {\n"
    temp_output += f"        'MarkaId': {int(row['MarkaId'])},\n"
    temp_output += f"        'AltKategoriId': {int(row['AltKategoriId'])},\n"
    temp_output += f"        'SegmentId': {int(row['SegmentId'])},\n"
    temp_output += f"        'LifeStyleGrupId': {int(row['LifeStyleGrupId'])},\n"
    temp_output += f"        'MU': {round(row['MU'], 2)},\n"
    temp_output += f"        'SegmentPSF': {int(row['SegmentPSF'])},\n"
    temp_output += f"        'KumasHedefMaliyet': {round(row['KumaşHedefMaliyet'], 2)},\n"
    temp_output += f"        'HesaplamaKuru': {int(row['HesaplamaKuru'])},\n"
    temp_output += f"        'KDV': {round(row['KDV'], 2)},\n"
    temp_output += f"        'AlimFiyat_TRY': {int(row['AlımFiyatı_TRY'])},\n"
    temp_output += f"        'AlimFiyat_USD': {round(row['AlımFiyatı_USD'], 2)},\n"
    temp_output += f"        'Sarf': {round(row['Sarf'], 2)}\n"
    temp_output += "    },\n"

print(temp_output)
print("    ... ve 399 kayit daha")
print("]\n")
