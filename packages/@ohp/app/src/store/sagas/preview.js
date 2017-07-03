// @flow
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import Processor from '@ohp/processor'

import type { CallEffect, IOEffect, PutEffect, SelectEffect, TakeEffect } from 'redux-saga/effects'

import * as Actions from 'store/modules/preview'
import { getBody } from 'store/selectors/entities/document'
import { components, outlineComponents } from 'settings/processor'

const processor = new Processor({
  body: { componentByName: components },
  outline: { componentByName: outlineComponents },
})

function getProcessor (): Processor {
  return processor
}

function * handleProcess (): Generator<CallEffect | PutEffect | SelectEffect, *, *> {
  // debounce by 500ms
  yield call(delay, 500)
  const rawBody = yield select(getBody)
  try {
    const { body, outline, styles, meta } = yield call(getProcessor().process, rawBody)
    yield put(Actions.setBody(body))
    yield put(Actions.setStyles(styles))
    yield put(Actions.setOutline(outline))
    yield put(Actions.setMeta(meta))
  } catch (e) {
    // TODO: Should handle errors
  }
}

function * watchProcess (): Generator<TakeEffect, *, *> {
  yield takeLatest(Actions.process, handleProcess)
}

export default function * (): Generator<IOEffect, *, *> {
  yield all([
    fork(watchProcess),
  ])
}
