const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./config.base')

const config = {
  devtool: 'cheap-module-source-map',

  entry: {
    main: [
      './src/main',
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],

  externals: [
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  target: 'electron-main',
}

module.exports = merge(base, config)
