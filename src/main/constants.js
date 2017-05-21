// @flow
import { join } from 'path'
import { format } from 'url'

const getWindowUrl = (filename: string) => format(
  process.env.NODE_ENV !== 'production'
  ? {
    hostname: 'localhost',
    port: process.env.PORT || 8765,
    pathname: filename,
    protocol: 'http',
    slashes: true,
  } : {
    pathname: join(__dirname, filename),
    protocol: 'file',
    slashes: true,
  }
)

export const mainWindowUrl = getWindowUrl('index.html')
export const printWindowUrl = getWindowUrl('print.html')

export const events = {
  openNewFile: 'openNewFile',
  openExistingFile: 'openExistingFile',
  saveFile: 'saveFile',
  saveAs: 'saveAs',
  exportPdf: 'exportPdf',
  toggleFullScreen: 'toggleFullScreen',
  openLearnMore: 'openLearnMore',
  quit: 'quit',
}
