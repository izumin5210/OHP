// @flow
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects'
import type { CallEffect, IOEffect, PutEffect, SelectEffect } from 'redux-saga/effects'

import * as ipc from 'services/ipc'
import * as Actions from 'store/modules/entities/document'
import * as PreviewActions from 'store/modules/preview'
import { getDocument } from 'store/selectors/entities/document'

function * handleSetBody (): Generator<PutEffect, *, *> {
  yield put(PreviewActions.process())
}

function * handleSave (
  action: Actions.Save,
): Generator<SelectEffect | CallEffect, *, *> {
  const { payload, error: isError } = action
  if (isError || payload instanceof Error) {
    return
  }

  assert('new' in payload)
  const doc = yield select(getDocument)
  yield call(ipc.save, doc, payload)
}

function * watchSetBody (): Generator<*, *, *> {
  yield takeEvery(Actions.setBody, handleSetBody)
}

function * watchSave (): Generator<*, *, *> {
  yield takeEvery(Actions.save, handleSave)
}

export default function * (): Generator<IOEffect, *, *> {
  yield all([
    fork(watchSetBody),
    fork(watchSave),
  ])
}
