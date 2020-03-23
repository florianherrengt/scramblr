#!/bin/bash

token=f30f2c4e801a47a049f81b01ef6e2fc019a632a7
repo=florianherrengt/scramblr_web

# curl -s -H "Authorization: token $token"  -d '{"tag_name": "test", "name":"release-0.0.1","body":"this is a test release"}' https://api.github.com/repos/$repo/releases
release_id=$(node scripts/getReleaseId.js)
curl -s -H "Authorization: token $token" -H "Content-Type: application/zip"  --data-binary @build/buil.zip https://uploads.github.com/repos/$repo/releases/$release_id/assets?name=build.zip
