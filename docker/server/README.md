## Base Docker image for MBTiles-Generator

### Supported tags and respective `Dockerfile` links
* [`0.3.0`, `latest` (Dockerfile)](https://github.com/mapsquare/mbtiles-generator/tree/master/docker/base)
* [`0.2.0` (Dockerfile)](https://github.com/mapsquare/mbtiles-generator/tree/master/docker/server)

### What are MBTiles ?
MBTiles is a specification allowing to store image map tiles into an sqlite database.
The spec is available on [GitHub](https://github.com/mapbox/mbtiles-spec)

### What is MBTiles Generator ?
Although MBTiles seem very convenient for offline purposes, it has always been tricky to create. 
Now, with this generator, you can easily make your own MBTiles using a remote tile-server (bing or OpenStreetMap).

### Usage
Two images are available: mapsquare/mbtiles-generator-base and mapsquare/mbtiles-generator-server.  
This image (**mapsquare/mbtiles-generator-server**), is an all-in-one server you can launch easily, only providing env variables.
  
Example of use:
```sh
docker run -p 2999:2999 -e "APP_MODE=server" -e "TILESERVER_TYPE=osm" -e "TILESERVER_ENDPOINT=http://mytileserver.org/{z}/{x}/{y}.png" -e "APP_TIMEOUT=300" -e "APP_MINZOOM=3" -e "APP_MAXZOOM=16" mapsquare/mbtiles-generator
```
ENV variables:
 * APP_MODE: the execution mode. Valid values: server, command. server will launch a server on port 2999, command creates the requested MBTiles and outputs in the container /opt/app/data folder.
 * TILESERVER_TYPE: the tile provider. Valid values: osm, bing.    
 * TILESERVER_ENDPOINT: depends on the provider. see app/mapper files and examples.
 * APP_TIMEOUT: timeout in seconds for server mode.
 * APP_MINZOOM: minzoom to compute the MBTiles.
 * APP_MAXZOOM: maxzoom to compute the MBTiles.
