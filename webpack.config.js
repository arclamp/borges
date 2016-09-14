var webpack = require('webpack');

module.exports = {
  entry: {
    borges: './index.js'
  },
  output: {
    library: '[name]',
    libraryTarget: 'umd',
    path: 'dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader'
      }
    ]
  }
};
