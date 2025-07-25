
# Sentinel-2 Image Export using Google Earth Engine

This repository contains a sample script to export cloud-free Sentinel-2 imagery using Google Earth Engine (GEE). It includes both a Python script (for use with the Earth Engine Python API) and a JavaScript version (for use in the GEE Code Editor).

## Contents

- `export_sentinel2.py`: Python script to filter and export Sentinel-2 images to Google Drive.
- `gee_script_export_sentinel2.js`: Original GEE JavaScript version.
- `README.md`: This documentation.

## Area of Interest (AOI)

- Bounding Box Coordinates: `[80.0756, 14.4465, 80.1519, 14.5295]`
- Location: Somewhere in Andhra Pradesh, India

## Python Requirements

- `earthengine-api`

## Export Parameters

- Dataset: `COPERNICUS/S2_SR_HARMONIZED`
- Cloud Filter: `<10%`
- Date Range: `2024-01-01` to `2024-01-31`
- Scale: `10 meters`
- Format: `GeoTIFF`
- Folder: `GEE_Exports` in your Google Drive

## Run the Python Script

```bash
earthengine authenticate
python export_sentinel2.py
```

---

## OR

## Google Earth Engine Script (JavaScript)

You can copy-paste the code from `gee_script_export_sentinel2.js` into [code.earthengine.google.com](https://code.earthengine.google.com) and run it directly.

---
