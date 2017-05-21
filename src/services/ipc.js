// @flow
import { ipcRenderer as ipc } from 'electron'

import * as channels from 'settings/ipc'
import Document from 'entities/Document'

import type { KeyboardHandler } from 'types'

export function save (doc: Document, opts: { new: boolean }) {
  ipc.send(channels.entities.document.save, doc.toJS(), opts)
}

export function startExportingAsPdf () {
  ipc.send(channels.exportAsPdf.start)
}

export function setKeyboardHandler (handler: KeyboardHandler) {
  ipc.send(channels.editor.setKeyboardHandler, handler)
}
