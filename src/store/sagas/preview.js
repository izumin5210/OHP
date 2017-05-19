// @flow
import { call, fork, put, select } from 'redux-saga/effects'
import { delay, takeLatest } from 'redux-saga'

import type { CallEffect, IOEffect, PutEffect, SelectEffect, TakeEffect } from 'redux-saga/effects'

import * as Actions from 'store/modules/preview'
import { getBody } from 'store/selectors/entities/document'

import DocumentProcessor from 'services/DocumentProcessor'

function * handleProcess (): Generator<CallEffect | PutEffect | SelectEffect, *, *> {
  // debounce by 500ms
  yield call(delay, 500)
  const rawBody = yield select(getBody)
  const processor = yield call(DocumentProcessor.execute, rawBody)
  yield put(Actions.setBody(processor.body))
  yield put(Actions.setOutline(processor.outline))
}

function * watchProcess (): Generator<TakeEffect, *, *> {
  yield takeLatest(Actions.process, handleProcess)
}

export default function * (): Generator<IOEffect, *, *> {
  yield [
    fork(watchProcess),
  ]
}
