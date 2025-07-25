
// Define Area of Interest using bounding box
var aoi = ee.Geometry.Rectangle([80.0756, 14.4465, 80.1519, 14.5295]);

// Filter Sentinel-2 SR Harmonized imagery
var collection = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate('2024-01-01', '2024-01-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .sort('CLOUDY_PIXEL_PERCENTAGE');

var count = collection.size();
print('Number of images found:', count);

// Select first (least cloudy) image and clip it to AOI
var image = collection.first().clip(aoi);

// Visualization parameters for true color
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4
};

// Display on the map
Map.centerObject(aoi, 13);
Map.addLayer(image, visParams, 'Sentinel-2 RGB');

// Export function
var exportImages = function(image) {
  var date = ee.Date(image.get('system:time_start')).format('YYYY-MM-dd');
  var filename = ee.String('Sentinel2_RGB_').cat(date);

  Export.image.toDrive({
    image: image.clip(aoi),
    description: filename.getInfo(),
    folder: 'GEE_Exports',
    fileNamePrefix: filename.getInfo(),
    region: aoi,
    scale: 10,
    fileFormat: 'GeoTIFF',
    maxPixels: 1e13
  });
};

// Iterate over the collection
collection.evaluate(function(col) {
  var features = col.features;
  print('Starting exports for ' + features.length + ' images...');
  features.forEach(function(f) {
    var image = ee.Image(f.id);
    exportImages(image);
  });
});
