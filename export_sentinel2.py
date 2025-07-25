
import ee

# Initialize the Earth Engine module.
ee.Initialize()

# Define Area of Interest using bounding box
aoi = ee.Geometry.BBox(80.0756, 14.4465, 80.1519, 14.5295)

# Filter Sentinel-2 SR Harmonized imagery
collection = (
    ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(aoi)
    .filterDate('2024-01-01', '2024-01-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .sort('CLOUDY_PIXEL_PERCENTAGE')
)

# Print number of images found
count = collection.size().getInfo()
print('Number of images found:', count)

# Select first image and visualize
image = collection.first().clip(aoi)

# Export function
def export_image(image, index):
    date = ee.Date(image.get('system:time_start')).format('YYYY-MM-dd').getInfo()
    filename = f"Sentinel2_RGB_{date}"
    task = ee.batch.Export.image.toDrive(
        image=image,
        description=filename,
        folder='GEE_Exports',
        fileNamePrefix=filename,
        region=aoi,
        scale=10,
        fileFormat='GeoTIFF',
        maxPixels=1e13
    )
    task.start()
    print(f"Started export: {filename}")

# Iterate and export each image
images_list = collection.toList(collection.size())
for i in range(count):
    img = ee.Image(images_list.get(i))
    export_image(img, i)
