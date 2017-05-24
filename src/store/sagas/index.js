// @flow
import { all, fork } from 'redux-saga/effects'
import type { IOEffect } from 'redux-saga/effects'

import documentSaga from './entities/document'
import editorSaga from './editor'
import previewSaga from './preview'
import exportAsPdfSaga from './exportAsPdf'
import ipcSaga from './ipc'

export default function * (): Generator<IOEffect, *, *> {
  yield all([
    fork(documentSaga),
    fork(editorSaga),
    fork(previewSaga),
    fork(exportAsPdfSaga),
    fork(ipcSaga),
  ])
}
