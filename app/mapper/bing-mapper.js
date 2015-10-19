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
 * Bing mapper file
 */
// Conf & Utils
var Conf = require('../conf/conf');
// Imports
var http = require('http');

// Variables
var tileServer;

/**
 * OSM Mapper computes a bing tile request URL from a tile metadata
 * http://tile-server.net/h{quadkey}.jpeg?g=4258&amp;mkt=en
 * @param t the requested tile
 * @returns {string}
 */
var getTileUrl = function (t) {
  return tileServer.replace('{quadkey}', tileXYToQuadKey(t));
};

/**
 * Returns the tile extension type. Can be .png or .jpg according to MBTiles spec
 * @returns {string}
 */
var getExtension = function () {
  return 'jpeg';
};

/**
 * Compute quadKey from tileXY
 * @param t
 * @returns {string}
 */
var tileXYToQuadKey = function (t) {
  var quadKey = '';
  for (var i = t.z; i > 0; i--) {
    var digit = 0;
    var mask = 1 << (i - 1);
    if ((t.x & mask)) {
      digit++;
    }
    if ((t.y & mask)) {
      digit += 2;
    }
    quadKey += digit;
  }
  return quadKey;
};

/**
 * Compute tileServerUrl from bing endpoint.
 * A valid bing endpoint looks like this:
 http://dev.virtualearth.net/REST/V1/Imagery/Metadata/{yourStyle}?mapVersion=v1&output=json&key={yourAPIKey}
 replacing endpoint implies that you replace {yourStyle} and {yourAPIKey} by appropriate values.
 External documentation available on https://msdn.microsoft.com/en-us/library/ff701716.aspx
 @returns {string} the bing tileServerUrl
 looks like this: http://ecn.t1.tiles.virtualearth.net/tiles/h{quadkey}.jpeg?g=4258&amp;mkt=en
 */
var getTileServerUrl = function () {
  http.get(Conf.tileServer.endpoint, function (res) {
    if (res.statusCode != 200) {
      console.error('Ooops');
      throw new Error('Cannot retrieve tileServerUrl. Please check that your bing endpoint is correct.');
    }
    res.setEncoding('utf-8');
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      body = JSON.parse(body);
      var tileServerUrl = body.resourceSets[0].resources[0].imageUrl;
      var subDomains = body.resourceSets[0].resources[0].imageUrlSubdomains;
      tileServer = tileServerUrl
          .replace('{culture}', Conf.tileServer.culture || 'en')
          .replace('{subdomain}', subDomains[Math.floor(Math.random() * subDomains.length)]);
    })
  }).on('error', function(err) {
    throw err;
  });
};

 
// Init
getTileServerUrl();

// Exports
module.exports = {
  "getTileUrl": getTileUrl,
  "getExtension": getExtension
};