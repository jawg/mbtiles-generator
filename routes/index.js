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
 * Routes
 */
// Classes
var Bounds = require('../model/bounds');
// Logging
var debug = require('debug')('mbt:server');
// Imports
var express = require('express');
var mbTileGeneratorService = require('../service/mbtile-generator-service');

var router = express.Router();

/**
 * Main route
 */
router.get('/mbtile', function (req, res, next) {
  var left = req.query.left;
  var bottom = req.query.bottom;
  var right = req.query.right;
  var top = req.query.top;
  var bounds = new Bounds(left, bottom, right, top);
  mbTileGeneratorService.getMBTile(bounds)
      .then(function (result) {
        var content = new Buffer(result, 'binary');
        res.set('Content-Type', 'application/x-sqlite3');
        res.set('Content-Disposition', 'inline; filename="mapsquare.mbtiles"');
        res.send(content);

      }, function (result) {
        res.send(result.message);
      });
});

// Exports
module.exports = router;