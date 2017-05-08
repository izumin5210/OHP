// @flow
import { fork, put, takeEvery } from 'redux-saga/effects'
import type { IOEffect, PutEffect } from 'redux-saga/effects'
import { push as pushLocation } from 'react-router-redux'

import { getPathFromKey } from 'routes/app'
import * as ExportActions from 'store/modules/exportAsPdf'

function * handlePrepare (): Generator<PutEffect, *, *> {
  yield put(pushLocation(getPathFromKey('document#show')))
}

function * watchPrepare (): Generator<*, *, *> {
  yield takeEvery(ExportActions.prepare, handlePrepare)
}

export default function * (): Generator<IOEffect, *, *> {
  yield [
    fork(watchPrepare),
  ]
}
