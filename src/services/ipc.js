// @flow
import { ipcRenderer as ipc } from 'electron'

import * as channels from 'settings/ipc'

export function startExportingAsPdf () {
  ipc.send(channels.exportAsPdf.start)
}
