const webpack = require('webpack')
const merge = require('webpack-merge')

const { host, port, outputPath, publicPath } = require('./configuration')
const base = require('./config.renderer.base')

const config = {
  devtool: 'source-map',

  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${host}:${port}/`,
      'webpack/hot/only-dev-server',
    ],
  },

  devServer: {
    host,
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: outputPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.LoaderOptionsPlugin({ minimize: false, debug: true }),
  ],
}

module.exports = merge(config, base)
