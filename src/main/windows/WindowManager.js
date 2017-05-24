// @flow
import { BrowserWindow } from 'electron'

import Window from './Window'
import MainWindow from './MainWindow'

export default class WindowManager {
  constructor () {
    this.windows = new Map()
  }

  windows: Map<string, Window>
  lastFocusedWindowId: string

  createMainWindow (): Window {
    const w = MainWindow.create()
    const id = w.id

    w.on('focus', () => {
      this.lastFocusedWindowId = id
    })
    w.on('closed', () => {
      this.windows.delete(id)
    })

    this.windows.set(id, w)
    return w;
  }

  getFocusedWindow (): Window {
    const focusedWindow = BrowserWindow.getFocusedWindow()

    if (focusedWindow != null) {
      return this.windows.get(focusedWindow.id)
    } else if (this.lastFocusedWindowId != null) {
      return this.windows.get(this.lastFocusedWindowId)
    }

    return this.createMainWindow()
  }

  onBeforeQuit () {
    this.windows.forEach((w) => { w.forceQuit = true })
  }

  onQuit () {
    this.windows.clear()
  }
}
