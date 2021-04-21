#!/usr/bin/env bash

_DIR=$(cd "$(dirname "$0")"; pwd)
cd $_DIR

npx webpack

cd build

mkdir -p mac
pkg ./xxx.js -t node14-macos-x64 -o mac/xxx
