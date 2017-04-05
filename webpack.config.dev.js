var webpack = require('webpack');
var path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: '/js/main.js'
  },
  module : {
    loaders : [
    {
      test: /\.jsx?$/,
      loader: 'babel',
      query:
      {
        presets:['es2015', 'react']
      }
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    },
    {
      test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      exclude: /\/favicon.ico$/,
      loader: 'file',
      query: {
        name: 'media/[name].[ext]'
      }
    }
    ]
  },
  plugins: []
};

module.exports = config;