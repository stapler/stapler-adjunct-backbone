#!/bin/bash -ex
tag=0.9.9
dst=src/main/resources/org/kohsuke/stapler/backbone
wget -O $dst/backbone.js     https://github.com/documentcloud/backbone/raw/$tag/backbone.js
wget -O $dst/backbone-min.js https://github.com/documentcloud/backbone/raw/$tag/backbone-min.js
mvn -B release:update-versions -DdevelopmentVersion=$tag-1-SNAPSHOT
