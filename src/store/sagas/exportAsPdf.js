// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import type { IOEffect, PutEffect } from 'redux-saga/effects'
import { push as pushLocation } from 'react-router-redux'

import { getPathFromKey } from 'routes/app'
import * as ExportActions from 'store/modules/exportAsPdf'
import * as ipc from 'services/ipc'

function * handlePrepare (): Generator<PutEffect, *, *> {
  yield put(pushLocation(getPathFromKey('document#show')))
}

function * handleStart (): Generator<PutEffect, *, *> {
  yield call(ipc.startExportingAsPdf)
}

function * handleComplete (): Generator<PutEffect, *, *> {
  yield put(pushLocation(getPathFromKey('document#edit')))
}

function * watchPrepare (): Generator<*, *, *> {
  yield takeEvery(ExportActions.prepare, handlePrepare)
}

function * watchStart (): Generator<*, *, *> {
  yield takeEvery(ExportActions.start, handleStart)
}

function * watchComplete (): Generator<*, *, *> {
  yield takeEvery(ExportActions.complete, handleComplete)
}

export default function * (): Generator<IOEffect, *, *> {
  yield all([
    fork(watchPrepare),
    fork(watchStart),
    fork(watchComplete),
  ])
}
