// @flow
import type { BrowserWindowOptions } from 'electron'

const { BrowserWindow } = require('electron')

class Window {
  win: ?BrowserWindow

  constructor (opts: BrowserWindowOptions) {
    this.win = new BrowserWindow(opts)
  }

  get url (): string {
    throw new Error('Should override url getter')
  }

  create () {
    const { win } = this
    if (win != null) {
      win.loadURL(this.url)
      win.on('closed', this.destroy.bind(this))
    }
    this.didWindowCreate()
  }

  didWindowCreate () {
    // do nothing
  }

  didWindowDestroy () {
    // do nothing
  }

  destroy () {
    if (this.win != null && this.win.isDestroyed()) {
      this.win = null
    }
    this.didWindowDestroy()
  }
}

module.exports = Window
