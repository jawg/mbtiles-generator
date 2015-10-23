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
FROM node:4.2.1-slim

MAINTAINER Loic Ortola <lortola@ebusinessinformation.fr>

RUN apt-get update && apt-get install -y git
RUN mkdir /opt/app
WORKDIR /tmp
RUN git clone https://github.com/mapsquare/mbtiles-generator.git \
  && mv mbtiles-generator/app/* /opt/app 
WORKDIR /opt/app
RUN npm install

# Remove configuration
RUN rm conf/conf.js

# Port exposed
EXPOSE 2999

# Launch server script
CMD ./start.sh