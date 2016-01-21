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
 * Created by Loïc Ortola on 19/10/2015.
 * OSM Mapper file
 */
// Conf & Utils
var Conf = require('../conf/conf');

var extension = Conf.tileServer.endpoint.substr(Conf.tileServer.endpoint.lastIndexOf('.'));

/**
 * OSM Mapper computes an OSM tile request URL from a tile metadata
 * http://tile-server.com/{z}/{x}/{y}.png
 * OR http://tile-server.com/{layer}/{z}/{x}/{y}.png
 * @param t the requested tile
 * @returns {string}
 */
var getTileUrl = function(t) {
  if (Conf.tileServer.endpoint.indexOf('{layer}') == -1) {
    return Conf.tileServer.endpoint.replace('{z}',t.z).replace('{x}', t.x).replace('{y}', t.y);
  } else {
    return Conf.tileServer.endpoint.replace('{layer}',t.layer).replace('{z}',t.z).replace('{x}', t.x).replace('{y}', t.y);  
  }
};

/**
 * Returns the tile extension type. Can be .png or .jpg according to MBTiles spec
 * @returns {string}
 */
var getExtension = function() {
  return extension;
};

// Exports
module.exports = {
  "getTileUrl": getTileUrl,
  "getExtension": getExtension
};