// @flow
import { BrowserWindow } from 'electron'

import type { BrowserWindowOptions } from 'electron'

export default class Window {
  win: ?BrowserWindow
  forceQuit: boolean

  constructor (opts: BrowserWindowOptions) {
    this.win = new BrowserWindow(opts)
    this.forceQuit = false
  }

  get url (): string {
    throw new Error('Should override url getter')
  }

  get id (): number {
    return this.win.id
  }

  create () {
    const { win } = this
    if (win != null) {
      win.loadURL(this.url)
      win.on('close', (e) => {
        if (!this.forceQuit) {
          e.preventDefault()
          win.hide()
        }
      })
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

  send (channel: string, ...args: Array<any>) {
    const webContents = this.win && this.win.webContents
    assert(webContents != null)
    if (webContents != null) {
      webContents.send(channel, ...args)
    }
  }

  show () {
    if (this.win != null) {
      this.win.show()
    }
  }

  on (event: string, callback: Function) {
    this.win.on(event, callback)
  }
}
