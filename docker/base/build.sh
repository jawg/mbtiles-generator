#!/bin/bash
docker build -t mapsquare/mbtiles-generator-base:0.3.0 .
docker build -t mapsquare/mbtiles-generator-base:latest .
