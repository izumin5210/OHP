// @flow
const { BrowserWindow } = require('electron')
const { mainWindowUrl } = require('../constants')

class MainWindow {
  static url = mainWindowUrl

  static create (): MainWindow {
    const win = new MainWindow()
    win.create()
    return win
  }

  win: ?BrowserWindow

  constructor () {
    this.win = new BrowserWindow({ width: 800, height: 600 })
  }

  create () {
    const { win } = this
    if (win != null) {
      win.loadURL(MainWindow.url)
      win.on('closed', this.destroy.bind(this))
    }
  }

  destroy () {
    if (this.win != null && this.win.isDestroyed()) {
      this.win = null
    }
  }
}

module.exports = MainWindow
