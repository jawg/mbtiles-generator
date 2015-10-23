/*
 Copyright 2015 eBusiness Information
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
/**
 * Created by Loïc Ortola on 16/10/2015.
 * MBTiles main application
 */
var EARTH_RADIUS = 6378.137;

/**
 * Get Tile x y from Latitude, Longitude and tile numbers
 * @param lat in degrees
 * @param lng in degrees
 * @param z
 * @returns {*[]}
 */
var latLngToTileXYForZoom = function(lat, lng, z) {
  var n = Math.pow(2, z);
  var x = n * ((lng + 180) / 360);
  var latRad = lat * 2 * Math.PI /360; 
  var y = n * (1 - (Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI)) / 2;
  return [Math.floor(x), Math.floor(y)];
};

/**
 * Compute the area in square kilometers of a lat lng quad.
 * @param b the bounds {left:, bottom:, right:, top:}
 */
var boundsToArea = function(b) {
  var r2 = Math.pow(EARTH_RADIUS, 2);
  console.log('Earth radius is ' + r2);
  // Area of lat bottom to the north-pole
  var alat1 = 2 * Math.PI * r2 * (1 - Math.sin(b.bottom * Math.PI / 180));
  // Area of lat top to the north-pole
  var alat2 = 2 * Math.PI * r2 * (1 - Math.sin(b.top * Math.PI / 180));
  // Area of lat portion strip
  var alat = alat1 - alat2;
  // Area of lat portion between left and right lngs.
  var a = alat * (Math.abs(b.left - b.right) / 360);
  return a;
};

/**
 * Validate bounds
 * @param b the bounds {left:, bottom:, right:, top:}
 */
var isValidBounds = function(b) {
  return b.left >= -180 && b.left <= 180 && b.right >= -180 && b.right <= 180 && b.bottom >= -85 && b.bottom <= 85 && b.top >= -85 && b.top <= 85
};

// Exports
module.exports = {
  latLngToTileXYForZoom: latLngToTileXYForZoom,
  boundsToArea: boundsToArea,
  isValidBounds: isValidBounds
};