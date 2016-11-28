var webpack = require('webpack');
var path = require('path');

var precss       = require('precss');
var cssnext      = require('postcss-cssnext');
var vars         = require('postcss-simple-vars');
var nested       = require('postcss-nested');
var mixins       = require('postcss-mixins');

var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
  entry: './src/Chartify.js',
  output: {
    filename: "./chartify.min.js",
    sourceMapFilename: './chartify.js.map',
    library: 'Chartify',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    }
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: path.join(__dirname, '/src'),
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css?$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true, 
      debug: true,
      sourceMap: false,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ],
  postcss: function () {
    return [precss, cssnext, vars, nested, mixins];
  }
};