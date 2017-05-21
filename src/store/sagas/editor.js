// @flow
import { call, fork, put, takeEvery } from 'redux-saga/effects'

import type { CallEffect, IOEffect, PutEffect, TakeEffect } from 'redux-saga/effects'

import * as Actions from 'store/modules/editor'
import * as preferences from 'services/preferences'
import * as ipc from 'services/ipc'

function * handleGetKeyboardHandler (): Generator<CallEffect | PutEffect, *, *> {
  const handler = yield call(preferences.getKeyboardHandler)
  yield put(Actions.setKeyboardHandler(handler))
  yield call(ipc.setKeyboardHandler, handler)
}

function * watchGetKeyboardHandler (): Generator<TakeEffect, *, *> {
  yield takeEvery(Actions.getKeyboardHandler, handleGetKeyboardHandler)
}

function * handleSetKeyboardHandler (
  action: Actions.SetKeyboardHandler,
): Generator<CallEffect, *, *> {
  if (!action.error) {
    yield call(preferences.setKeyboardHandler, action.payload)
  }
  assert(!action.error)
}

function * watchSetKeyboardHandler (): Generator<TakeEffect, *, *> {
  yield takeEvery(Actions.setKeyboardHandler, handleSetKeyboardHandler)
}

export default function * (): Generator<IOEffect | PutEffect, *, *> {
  yield [
    fork(watchGetKeyboardHandler),
    fork(watchSetKeyboardHandler),
  ]
}
