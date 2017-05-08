// @flow
import { fork } from 'redux-saga/effects'
import type { IOEffect } from 'redux-saga/effects'

import exportAsPdfSaga from './exportAsPdf'
import ipcSaga from './ipc'

export default function * (): Generator<IOEffect, *, *> {
  yield [
    fork(exportAsPdfSaga),
    fork(ipcSaga),
  ]
}
