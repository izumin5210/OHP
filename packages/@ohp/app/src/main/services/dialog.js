// @flow
import { dialog } from 'electron'

import type { DialogOpenOptions } from 'electron'
import type { Window } from '../windows'

type Options = {
  window?: ?Window,
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
  return showDialog(cb => dialog.showOpenDialog(window ? window.window : undefined, options, cb))
}

export function showSaveDialog (
  { window, options = {} }: Options = defaultOptions,
): Promise<string> {
  return showDialog(cb => dialog.showSaveDialog(window ? window.window : undefined, options, cb))
}
