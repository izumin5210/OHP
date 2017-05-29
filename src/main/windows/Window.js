// @flow
import { BrowserWindow } from 'electron'

import type { BrowserWindowOptions, BrowserWindowEvents, WebContentsEvents } from 'electron'

export default class Window {
  static defaultOptions = {
    show: false,
  }

  constructor (opts: BrowserWindowOptions) {
    this.window = new BrowserWindow(Object.assign({}, Window.defaultOptions, opts))
    this.window.on('close', this.onClose)
    this.window.once('ready-to-show', this.window.show)
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

  create (initialState?: Object) {
    this.window.loadURL(this.url)
    if (initialState != null) {
      this.window.webContents.on('did-finish-load', () => {
        this.send('initialState', initialState)
      })
    }
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
