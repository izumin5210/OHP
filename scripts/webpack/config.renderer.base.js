const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const { src } = require('./configuration')
const base = require('./config.base')

const config = {
  entry: {
    app: [
      path.resolve(src, 'index'),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(src, 'index.html'),
      inject: true
    }),
  ],

  externals: [
  ],

  target: 'electron-renderer',
}

module.exports = merge(base, config)
