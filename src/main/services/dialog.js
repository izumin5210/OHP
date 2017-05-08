// @flow
import type { BrowserWindow, DialogOpenOptions } from 'electron'
const { dialog } = require('electron')

export function showSaveDialog (
  win?: ?BrowserWindow,
  options: DialogOpenOptions,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const cb = (filename) => {
      if (filename === null) {
        // TODO: should use custom error
        reject(new Error())
      } else {
        resolve(filename)
      }
    }
    dialog.showSaveDialog(win || undefined, options, cb)
  })
}
