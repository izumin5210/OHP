// @flow
const Window = require('./Window')
const { mainWindowUrl } = require('../constants')

class MainWindow extends Window {
  static url = mainWindowUrl

  static create (): MainWindow {
    const win = new MainWindow({ width: 800, height: 600 })
    win.create()
    return win
  }

  get url (): string {
    return MainWindow.url
  }
}

module.exports = MainWindow
