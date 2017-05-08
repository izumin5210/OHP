// @flow
import { call, fork, select, takeEvery } from 'redux-saga/effects'
import type { CallEffect, IOEffect, SelectEffect } from 'redux-saga/effects'

import * as ipc from 'services/ipc'
import * as Actions from 'store/modules/entities/document'
import { getDocument } from 'store/selectors/entities/document'

function * handleSave (
  action: Actions.Save,
): Generator<SelectEffect | CallEffect, *, *> {
  const { error: isError } = action
  if (isError) {
    return
  }

  const doc = yield select(getDocument)
  yield call(ipc.save, doc)
}

function * watchSave (): Generator<*, *, *> {
  yield takeEvery(Actions.save, handleSave)
}

export default function * (): Generator<IOEffect, *, *> {
  yield [
    fork(watchSave),
  ]
}
