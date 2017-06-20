const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const { src, entries } = require('./configuration')
const base = require('./config.base')

const config = {
  entry: {
    app: [
      path.resolve(entries, 'app'),
    ],
  },

  output: {
    filename: '[name]-[hash].js',
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      title: 'OHP',
      filename: 'index.html',
      template: path.resolve(src, 'index.html'),
      chunks: ['app'],
      inject: true
    }),
  ],

  externals: [
  ],

  target: 'electron-renderer',
}

module.exports = merge(base, config)
