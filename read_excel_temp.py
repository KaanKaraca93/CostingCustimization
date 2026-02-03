import pandas as pd
import json
import sys

# Set UTF-8 encoding for console output
sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

# Read the Excel file
df = pd.read_excel('DecisionTable.xlsx')

# Display basic info
print("=" * 80)
print("EXCEL DOSYASI OKUNDU")
print("=" * 80)
print(f"\nToplam Satir Sayisi: {len(df)}")
print(f"Toplam Sutun Sayisi: {len(df.columns)}")
print(f"\nSutunlar:\n{list(df.columns)}\n")

# Display first few rows
print("=" * 80)
print("ILK 5 SATIR")
print("=" * 80)
print(df.head().to_string())

# Display last few rows
print("\n" + "=" * 80)
print("SON 5 SATIR")
print("=" * 80)
print(df.tail().to_string())

# Check for any null values
print("\n" + "=" * 80)
print("NULL DEGERLER")
print("=" * 80)
print(df.isnull().sum())

# Save to JSON for further processing
data_list = df.to_dict('records')
with open('decision_table_data_temp.json', 'w', encoding='utf-8') as f:
    json.dump(data_list, f, ensure_ascii=False, indent=2)

print(f"\nVeri 'decision_table_data_temp.json' dosyasina kaydedildi")
print(f"Toplam {len(data_list)} kayit var")
