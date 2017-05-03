const path = require('path')

const env = process.env.NODE_ENV || 'development'
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8765

const root = path.resolve(__dirname, '..', '..')
const src = path.resolve(root, 'src')
const dist = path.resolve(root, 'dist')

const publicPath = env !== 'production' ? `http://${host}:${port}/` : '/'
const outputPath = dist

module.exports = {
  host,
  port,
  root,
  src,
  dist,
  publicPath,
  outputPath,
}
