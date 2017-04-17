const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  }
}

if (process.env.NODE_ENV === 'production') {
        module.exports.plugins = (module.exports.plugins || []).concat([
        // 环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}

