#!/bin/sh

nginx -g "daemon off;" &

cd /usr/share/nginx/html/apps/web && npm run start
