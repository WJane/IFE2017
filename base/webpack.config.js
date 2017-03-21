const path = require('path')
const webpack = require('webpack')



module.exports = {
  entry: './12.js',

  output: {
    publicPath: '/',
    filename: 'app.js'

  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },


}


