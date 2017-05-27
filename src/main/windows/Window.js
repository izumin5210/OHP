// @flow
import { BrowserWindow } from 'electron'

import type { BrowserWindowOptions, BrowserWindowEvents, WebContentsEvents } from 'electron'

export default class Window {
  constructor (opts: BrowserWindowOptions) {
    this.window = new BrowserWindow(opts)
    this.window.on('close', this.onClose)
    this.willForceQuit = false
  }

  willForceQuit: boolean
  window: BrowserWindow

  onClose = (e: any) => {
    if (!this.willForceQuit) {
      e.preventDefault()
      this.window.hide()
    }
  }

  get id (): string {
    return this.window.id
  }

  get url (): string {
    throw new Error('Should override url getter')
  }

  forceQuit () {
    this.willForceQuit = true
  }

  create () {
    this.window.loadURL(this.url)
  }

  show () {
    this.window.show()
  }

  on (channel: BrowserWindowEvents, callback: Function) {
    this.window.on(channel, callback)
  }

  onWebContents (channel: WebContentsEvents, callback: Function) {
    this.window.webContents.on(channel, callback)
  }

  send (channel: string, ...args: Array<any>) {
    this.window.webContents.send(channel, ...args)
  }
}
