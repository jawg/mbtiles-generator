# MBTiles generator

A project designed to provide a simple API for generating MBTiles for a bounding box, fetching data from a remote tile-server.

**Warning: this tool can generate heavy load on tile-servers. Use it responsibly.**

## Features
 * REST API or command line tool
 * Lightweight, easily configurable
 * Multiple map providers supported (osm and bing)
 * Additional providers can easily be declared
 
## Howto
 * Install nodejs
 * in the repository root, type ``npm install``
 * To launch the server mode, execute ``./start.sh`` or ``./start-debug.sh``
 * To use the cli, execute ``./run.sh --left=2.31760654 --bottom=48.8243829 --right=2.358607 --top=48.8513625``

## Configuration
To configure your application, edit the conf/Conf.js file.  
The file may look like this
```javascript
module.exports = {
  "tileServer": {"type": "...", "endpoint": "..."}, // Tile server specs
  "minZoom": 5, // Minimum zoom level to compute for an mbtile.
  "maxZoom": 17, // Maximum zoom level to compute for an mbtile
  "timeout": 300000 // Http Timeout in milliseconds (Server-mode only)
};
```
Two tile providers are currently supported :  
**OpenStreetMap**:
In this case, provide the following tileServer (replace your endpoint):  
```javascript
"tileServer": {"type": "osm", "endpoint": "http://your-tileserver/{z}/{x}/{y}.png"}
```
**Bing**:
In this case, provide the following tileServer (replace your style and ApiKey):  
```javascript
"tileServer": {
"type": "bing", 
"endpoint": "http://dev.virtualearth.net/REST/V1/Imagery/Metadata/Aerial?mapVersion=v1&output=json&key=myApiKey",
"culture": "fr"
}
```

## Server API
The server runs on port 2999 and listens to one endpoint:

**[GET]**``/mbtile``:  
Requires 4 parameters: left, bottom, right, top.  
**Example**: ``http://localhost:2999/mbtile?left=2.31760654&bottom=48.8243829&right=2.358607&top=48.8513625``

## CLI
The CLI needs 4 parameters to be provided to work: --left, --bottom, --right, --top.  
Use ./run.sh --help for more information.

## License

Copyright 2015 eBusiness Information

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
