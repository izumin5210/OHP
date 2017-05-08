// @flow
import type { BrowserWindow, DialogOpenOptions } from 'electron'
const { dialog } = require('electron')

export function showSaveDialog(
  win?: ?BrowserWindow,
  options: DialogOpenOptions,
): Promise<string> {
  return new Promise((resolve, reject) => {
    dialog.showSaveDialog(win, options, (filename) => {
      if (filename === null) {
        reject()
      } else {
        resolve(filename)
      }
    })
  })
}
