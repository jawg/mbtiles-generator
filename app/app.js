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
// Conf & Utils
var Conf = require('./conf/conf');
// Classes
var Bounds = require('./model/bounds');
// Logging
var logger = require('morgan');
// Imports
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var minimist = require('minimist');
var mbTilesGeneratorService = require('./service/mbtiles-generator-service');

var app = express();

var argv = minimist(process.argv.slice(2));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

if (process.argv.length > 2) {
  if (argv.help) {
    console.log('Following arguments must be used:');
    console.log('--left=00.000000 (left coordinate in degrees, WGS:84 format valid values: -180.0 to 180.0 .)');
    console.log('--right=00.000000 (right coordinate in degrees, WGS:84 format valid values: -180.0 to 180.0 .)');
    console.log('--top=00.000000 (top coordinate in degrees, WGS:84 format valid values: -85.0 to 85.0 .)');
    console.log('--bottom=00.000000 (bottom coordinate in degrees, WGS:84 format valid values: -85.0 to 85.0 .)');
    console.log('Following arguments can be used:');
    console.log('--min-zoom=z (valid values: 0 to 22.)');
    console.log('The minimum zoom level. Will override the default configuration');
    console.log('--max-zoom=z (valid values: 0 to 22 and > min-zoom.)');
    console.log('The maximum zoom level. Will override the default configuration');
    console.log('--layer=mylayer');
    console.log('The layer to render.');
    console.log('Example:');
    console.log('./run.sh --left=2.31760654 --bottom=48.8243829 --right=2.358607 --top=48.8513625');
    console.log('./run.sh --left=2.31760654 --bottom=48.8243829 --right=2.358607 --top=48.8513625 --max-zoom=12 --layer=roads');
    process.exit();
  }
  if (argv['min-zoom']) {
    Conf.minZoom = argv['min-zoom'];
  }
  if (argv['max-zoom']) {
    Conf.maxZoom = argv['max-zoom'];
  }
  var left = argv['left'];
  var bottom = argv['bottom'];
  var right = argv['right'];
  var top = argv['top'];
  var layer = argv['layer'];
  var bounds = new Bounds(left, bottom, right, top);
  // Dirty wait for modules to init.
  setTimeout(function() {
    mbTilesGeneratorService.requestMBTilesSync(bounds, layer)
        .then(function () {
          process.exit();
        }, function (result) {
          console.error('Process will exit with error: ' + result);
          process.exit(-1);
        });
  }, 1000);

}

module.exports = app;