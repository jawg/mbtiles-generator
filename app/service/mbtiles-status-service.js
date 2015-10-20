
// Logging
var debug = require('debug')('mbt:service:mbtile-status-service');
// Imports
var HashMap = require('hashmap');

var mbtilesStatus = new HashMap();

/**
 * Add new MBTiles to map
 * @param token
 */
var create = function(token) {
  var value = {"status": "generating", "progress": 0};
  mbtilesStatus.set(token, value);
};

/**
 * Update MBTiles status in map
 * @param token
 * @param status
 * @param progress
 */
var update = function(token, status, progress) {
  var value = {"status": status, "progress": progress};
  mbtilesStatus.set(token, value);
  forwardUpdate(token, value);
};

/**
 * Broadcast update to master
 * @param token 
 * @param value
 */
var forwardUpdate = function(token, value) {
  debug('Forwarding update to master :' + JSON.stringify(value));
  process.send({"tag": "mbtiles-status-broadcast", "key": token, "value": value});
  debug('Forwarded');
};

/**
 * Received push update from paster
 */
process.on('message', function(msg) {
  if (msg.tag === 'mbtiles-status-push') {
    receiveUpdate(msg);
  }
});

/**
 * Apply update to worker
 * @param data
 */
var receiveUpdate = function(data) {
  mbtilesStatus.set(data.key, data.value);
};

/**
 * Retrieve status of current mbtiles generation.
 * @param token
 * @returns {"status": "generating|done|downloaded", "progress": 11}
 */
var get = function (token) {
  return mbtilesStatus.get(token);
};

// Exports
module.exports = {
  "get": get,
  "update": update,
  "create": create,
  "dispatchUpdate": forwardUpdate,
  "receiveUpdate": receiveUpdate
};