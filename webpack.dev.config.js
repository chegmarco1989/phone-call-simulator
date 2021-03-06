const EXTRACT_TEXT_PLUGIN = require('extract-text-webpack-plugin');
const PATH = require('path');
const WEBPACK = require('webpack');

module.exports = {
  context: PATH.resolve('app'),

  entry: {
    javascript: './app.js',
    html: './index.html',
  },
  output: {
    filename: 'app.js',
    path: PATH.resolve('dist'),
  },
  resolve: {
    root: [PATH.resolve(__dirname, 'app'), PATH.resolve(__dirname, 'node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      }, {
        test: /\.scss$/,
        loader: EXTRACT_TEXT_PLUGIN.extract('css!sass')
      }, {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new EXTRACT_TEXT_PLUGIN('style.css', {
      allChunks: true
    }),
    new WEBPACK.optimize.CommonsChunkPlugin('common.js'),
  ]
};
