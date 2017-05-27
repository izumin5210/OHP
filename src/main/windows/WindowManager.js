// @flow
import { BrowserWindow } from 'electron'
import type { WebContents } from 'electron'

import Window from './Window'
import MainWindow from './MainWindow'

export default class WindowManager {
  constructor () {
    this.windows = new Map()
  }

  windows: Map<string, Window>
  lastFocusedWindowId: string

  set (window: Window): void {
    const id = window.id

    window.on('focus', () => {
      this.lastFocusedWindowId = id
    })
    window.on('closed', () => {
      this.windows.delete(id)
    })

    this.windows.set(id, window)
  }

  get (id: string): ?Window {
    return this.windows.get(id)
  }

  getFocusedWindow (): Window {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    let win

    if (focusedWindow != null) {
      win = this.windows.get(focusedWindow.id)
      assert(win != null)
    } else if (this.lastFocusedWindowId != null) {
      win = this.windows.get(this.lastFocusedWindowId)
      assert(win != null)
    }

    if (win == null) {
      win = MainWindow.create()
      this.set(win)
    }

    return win
  }

  forceQuit () {
    this.windows.forEach((w) => { w.forceQuit() })
  }

  onQuit () {
    this.windows.clear()
  }

  fromWebContents (webContents: WebContents): ?Window {
    const bw = BrowserWindow.fromWebContents(webContents)
    return bw != null ? this.get(bw.id) : null
  }
}
