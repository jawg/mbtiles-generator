## Base Docker image for MBTiles-Generator

### Supported tags and respective `Dockerfile` links
* [`0.2.0`, `latest` (Dockerfile)](https://github.com/mapsquare/mbtiles-generator/tree/master/docker/base)

### What are MBTiles ?
MBTiles is a specification allowing to store image map tiles into an sqlite database.
The spec is available on [GitHub](https://github.com/mapbox/mbtiles-spec)

### What is MBTiles Generator ?
Although MBTiles seem very convenient for offline purposes, it has always been tricky to create. 
Now, with this generator, you can easily make your own MBTiles using a remote tile-server (bing or OpenStreetMap).

### Usage
Two images are available: mapsquare/mbtiles-generator-base and mapsquare/mbtiles-generator-server.  
This image (**mapsquare/mbtiles-generator-base**), is the bare generator: the application without any configuration file.  
The purpose of this image is to serve as a base-image for your own derivated images, so you have more control over the configuration and output data.  
If you are just looking for an easy bootstrap of the app, consider using the mapsquare/mbtiles-generator-server image instead.  

Here is a typical usage of this base-image:  
```sh
#replace here!
export MBTG_CONF=/your/path/to/etc/mbtiles-generator 
#replace here!
export MBTG_DATA=/your/path/to/tmp/mbtiles-generated
docker run -d -p 2999:2999 -v $MBTG_CONF:/opt/app/conf -v $MBTG_DATA/data:/opt/app/data --name=mbtiles-generator mapsquare/mbtiles-generator-base:latest
```