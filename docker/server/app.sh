#!/bin/bash
# Replace conf by env variables conf 
sed -e "s/\${tileServer.type}/$TILESERVER_TYPE/" \
 -e "s!\${tileServer.endpoint}!$TILESERVER_ENDPOINT!" \
 -e "s/\${maxZoom}/$APP_MAXZOOM/" \
 -e "s/\${minZoom}/$APP_MINZOOM/" \
 -e "s/\${maxArea}/$APP_MAXAREA/" \
 -e "s/\${timeout}/$APP_TIMEOUT/" \
 conf/conf.js.template > conf/conf.js
 
# Launch server or CLI
case "$APP_MODE" in
  server)
  ./start.sh $@
  ;;
  *)
  ./run.sh $@
  ;;
esac