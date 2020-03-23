#!/bin/sh

curl -s https://api.github.com/repos/florianherrengt/scramblr_web/releases/latest \
| grep "build.zip" \
| cut -d : -f 2,3 \
| tr -d \" \
| wget -qi -

unzip build.zip -d assets

rm build.zip

ls assets/static/js
ls assets/static/css