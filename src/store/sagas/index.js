// @flow
import { fork } from 'redux-saga/effects'
import type { IOEffect } from 'redux-saga/effects'

import documentSaga from './entities/document'
import exportAsPdfSaga from './exportAsPdf'
import ipcSaga from './ipc'

export default function * (): Generator<IOEffect, *, *> {
  yield [
    fork(documentSaga),
    fork(exportAsPdfSaga),
    fork(ipcSaga),
  ]
}
