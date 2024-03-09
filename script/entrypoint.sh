#!/bin/sh

nginx -g "daemon off;" &

cd /usr/share/nginx/html/apps/www && npm run start
