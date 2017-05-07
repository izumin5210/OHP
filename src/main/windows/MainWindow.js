// @flow
const { BrowserWindow } = require('electron')
const { mainWindowUrl } = require('../constants')

class MainWindow {
  static url = mainWindowUrl

  static create(): MainWindow {
    const win = new MainWindow()
    win.create()
    return win
  }
  
  win: BrowserWindow

  constructor () {
    this.win = new BrowserWindow({ width: 800, height: 600 })
  }

  create () {
    this.win.loadURL(MainWindow.url)
    this.win.on('closed', this.destroy.bind(this))
  }

  destroy() {
    if (this.win.isDestroyed()) {
      this.win = null
    }
  }
}

module.exports = MainWindow
