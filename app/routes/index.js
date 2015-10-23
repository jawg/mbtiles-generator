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
// Conf & Utils
var Conf = require('../conf/conf');
var ProjectionUtils = require('../util/projection-utils');
// Classes
var Bounds = require('../model/bounds');
// Logging
var debug = require('debug')('mbt:server');
// Imports
var express = require('express');
var mbTilesGeneratorService = require('../service/mbtiles-generator-service');
var mbTilesStatusService = require('../service/mbtiles-status-service');
var router = express.Router();

/**
 * Main route
 */
router.get('/mbtiles', function (req, res, next) {
  var left = req.query.left;
  var bottom = req.query.bottom;
  var right = req.query.right;
  var top = req.query.top;
  var bounds = new Bounds(left, bottom, right, top);

  // Validate Bounds
  if (!ProjectionUtils.isValidBounds(bounds)) {
    res.set('Content-Type', 'application/json');
    // Bad request
    res.statusCode = 400;
    res.send({"message": 'Wrong bounds provided. Please provide a valid set of bounds to complete request.'});
    return;
  }

  // Validate Request Area
  var requestArea = ProjectionUtils.boundsToArea(bounds);
  if (Conf.maxArea && Conf.maxArea > 0 && requestArea > Conf.maxArea) {
    var msg = 'Requested area (' + Math.floor(requestArea) + ' km2) is superior to the application maxArea (' + Conf.maxArea + ' km2)';
    console.error(msg);
    res.set('Content-Type', 'application/json');
    // Bad request
    res.statusCode = 400;
    res.send({"message": msg});
    return;
  }
  
  // Wait for promise to be resolved before returning response (synchronous behaviour)
  mbTilesGeneratorService.requestMBTilesSync(bounds)
      .then(function (result) {
        var content = new Buffer(result, 'binary');
        res.set('Content-Type', 'application/x-sqlite3');
        res.set('Content-Disposition', 'inline; filename="mapsquare.mbtiles"');
        res.send(content);

      }, function (result) {
        res.send(result.message);
      });
});

/**
 * Main route
 */
router.get('/mbtiles/async', function (req, res, next) {
  var left = req.query.left;
  var bottom = req.query.bottom;
  var right = req.query.right;
  var top = req.query.top;
  var bounds = new Bounds(left, bottom, right, top);
  
  // Validate Bounds
  if (!ProjectionUtils.isValidBounds(bounds)) {
    res.set('Content-Type', 'application/json');
    // Bad request
    res.statusCode = 400;
    res.send({"message": 'Wrong bounds provided. Please provide a valid set of bounds to complete request.'});
    return;
  }
  
  // Validate Request Area
  var requestArea = ProjectionUtils.boundsToArea(bounds);
  if (Conf.maxArea && Conf.maxArea > 0 && requestArea > Conf.maxArea) {
    var msg = 'Requested area (' + Math.floor(requestArea) + ' km2) is superior to the application maxArea (' + Conf.maxArea + ' km2)';
    console.error(msg);
    res.set('Content-Type', 'application/json');
    // Bad request
    res.statusCode = 400;
    res.send({"message": msg});
    return;
  }
  
  // Return token
  var token = mbTilesGeneratorService.requestMBTiles(bounds);
  res.set('Content-Type', 'application/json');
  res.send({"token": token});
});

/**
 * Main route
 */
router.get('/mbtiles/status/:token', function (req, res, next) {
  var token = req.params.token;
  var status = mbTilesStatusService.get(token);
  res.set('Content-Type', 'application/json');
  if (status && status.status === "generating") {
    // If generating, set to 202-ACCEPTED
    res.statusCode = 202;
    res.send(status);
  } else {
    // Else, not found.
    res.statusCode = 404;
    res.send({"message": "Token does not exist. please refer to a valid mbtiles token."});
  }
});

/**
 * Main route
 */
router.get('/mbtiles/download/:token', function (req, res, next) {
  var token = req.params.token;
  mbTilesGeneratorService.getMBTiles(token, function(result) {
    if (!result) {
      // Not ready yet.
      res.statusCode = 202;
      res.send();
      return;
    }
    var content = new Buffer(result, 'binary');
    res.set('Content-Type', 'application/x-sqlite3');
    res.set('Content-Disposition', 'inline; filename="mapsquare.mbtiles"');
    res.send(content);
    
  });
});

// Exports
module.exports = router;