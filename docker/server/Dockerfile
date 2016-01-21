#   Copyright 2015 eBusiness Information
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

FROM mapsquare/mbtiles-generator-base:0.3.0

# The difference between this mbtiles-generator and the base image, is that this one allows an easy bootstrap of the mbtiles-generator server.
# That means user only needs to provide env variables, which will configure the docker at runtime.

MAINTAINER Loic Ortola <lortola@ebusinessinformation.fr>

# Add template conf and app script
ADD *.template ./conf/
ADD app.sh ./

# Environment defaults
ENV APP_MODE=server
ENV TILESERVER_TYPE=osm
ENV TILESERVER_ENDPOINT=http://a.tile.openstreetmap.org/{z}/{x}/{y}.png
ENV APP_MINZOOM=1
ENV APP_MAXZOOM=17
ENV APP_MAXAREA=16
# Only for server mode
ENV APP_TIMEOUT=300

# Launch script
CMD ./app.sh