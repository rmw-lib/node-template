'use strict';

import path from 'path';
import webpack from 'webpack';
import fs from 'fs'

let externals = _externals();
export default {
  mode: 'production',
  entry: './lib/index.js',
  externals: externals,
  target: 'node',
  output: {
    path: path.resolve('./build'),
    filename: 'xxx.js'
  },
  node: {
    __dirname: true
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              "targets": {
                "node": true
              }
            }]]
          }
        },
        test: /\.js$/,
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  optimization: {
    minimize: true
  }
};

function _externals() {
  let manifest = JSON.parse(fs.readFileSync("./package.json"));
  let dependencies = manifest.dependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  return externals;
}

