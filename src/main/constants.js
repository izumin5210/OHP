// @flow
const { join } = require('path')
const { format } = require('url')

export const mainWindowUrl = format(
  process.env.NODE_ENV !== 'production' ?
  {
    pathname: `localhost:${process.env.PORT || 8765}`,
    protocol: 'http',
    slashes: true,
  } : {
    pathname: join(__dirname, '..', 'index.html'),
    protocol: 'file',
    slashes: true,
  }
)

export const events = {
  openNewFile: 'openNewFile',
  exportPdf: 'exportPdf',
  toggleFullScreen: 'toggleFullScreen',
  openLearnMore: 'openLearnMore',
  quit: 'quit',
}
