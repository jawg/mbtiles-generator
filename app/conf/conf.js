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
 * MBTiles Generator Configuration
 */
module.exports = {
  "tileServer": {"type": "osm", "endpoint": "http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"},
  "minZoom": 4,
  "maxZoom": 19,
  "timeout": 500000 // Timeout in milliseconds
};