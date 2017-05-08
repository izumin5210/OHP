// @flow
const Window = require('./Window')
const { printWindowUrl } = require('../constants')

class PrintWindow extends Window {
  static url = printWindowUrl

  static create (): PrintWindow {
    const win = new PrintWindow({ width: 800, height: 600 })
    win.create()
    return win
  }

  get url (): string {
    return PrintWindow.url
  }
}

module.exports = PrintWindow
