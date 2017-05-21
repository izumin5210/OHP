const { DefinePlugin } = require('webpack')

const { src, publicPath, outputPath } = require('./configuration')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  resolve: {
    modules: [
      src,
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        use: [
          { loader: 'eslint-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: outputPath,
    publicPath,
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
    }),
  ],
}
