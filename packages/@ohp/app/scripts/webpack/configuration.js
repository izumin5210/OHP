const { resolve } = require('path')

const env = process.env.NODE_ENV || 'development'
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8765

const root = resolve(__dirname, '..', '..')
const src = resolve(root, 'src')
const dist = resolve(root, 'dist')

const entries = resolve(src, 'entries')
const publicPath = env !== 'production' ? `http://${host}:${port}/` : ''
const outputPath = dist

module.exports = {
  host,
  port,
  root,
  src,
  dist,
  entries,
  publicPath,
  outputPath,
}
