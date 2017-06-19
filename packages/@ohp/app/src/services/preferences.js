// @flow
import * as keys from 'settings/localStorage'

import type { KeyboardHandler } from 'types'

export function getKeyboardHandler (): KeyboardHandler {
  const handler = localStorage.getItem(keys.keyboardHandler)
  switch (handler) {
    case '':
    case 'vim':
    case 'emacs':
      return handler
    default:
      return ''
  }
}

export function setKeyboardHandler (handler: KeyboardHandler) {
  localStorage.setItem(keys.keyboardHandler, handler)
}
