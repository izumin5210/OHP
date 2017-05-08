// @flow
import type { BrowserWindow, DialogOpenOptions } from 'electron'
const { dialog } = require('electron')

type Options = {
  window?: ?BrowserWindow,
  options: DialogOpenOptions,
}

const defaultOptions: Options = { options: {} }

function showDialog<T> (proc: (cb: (result: T) => any) => any): Promise<T> {
  return new Promise((resolve, reject) => {
    const cb = (result) => {
      if (result == null) {
        // TODO: should use custom error
        reject(new Error())
      } else {
        resolve(result)
      }
    }
    proc(cb)
  })
}

export function showOpenDialog (
  { window, options = {} }: Options = defaultOptions,
): Promise<Array<string>> {
  return showDialog(cb => dialog.showOpenDialog(window || undefined, options, cb))
}

export function showSaveDialog (
  { window, options = {} }: Options = defaultOptions,
): Promise<string> {
  return showDialog(cb => dialog.showSaveDialog(window || undefined, options, cb))
}
