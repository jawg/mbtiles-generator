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
 * Tile model
 */
// Constructor
function Tile(x, y, z, layer, ext) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.layer = layer || 'default';
  this.ext = ext;
  var tileCountXY = Math.pow(2, z);
  if (this.x >= tileCountXY || this.y >= tileCountXY) {
    throw new Error('Illegal parameters for tile');
  }
}

// Static Methods
Tile.getId = function (x, y, z, layer, ext) {
  return x + '-' + y + '-' + z + '-' + layer + '-' + ext;
};

Tile.fromId = function (id) {
  //id <=> number-number-number-layer-ext
  var idArray = id.split('-');
  return new Tile(idArray[0], idArray[1], idArray[2], idArray[3], idArray[4]);
};

Tile.copy = function (t) {
  return new Tile(t.x, t.y, t.z, t.layer, t.ext);
};

// Methods
Tile.prototype.getId = function () {
  return this.x + '-' + this.y + '-' + this.z + '-' + this.layer + '-' + this.ext;
};

// Export class
module.exports = Tile;