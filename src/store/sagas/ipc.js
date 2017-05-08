// @flow
import { call, fork, put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { ipcRenderer as ipc } from 'electron'

import type { CallEffect, IOEffect, PutEffect, TakeEffect } from 'redux-saga/effects'

import * as ExportActions from 'store/modules/exportAsPdf'
import * as channels from 'settings/ipc'

function * subscribe () {
  return eventChannel((emit) => {
    ipc.on(channels.prepareToExportPdf, () => {
      emit(ExportActions.prepare())
    })

    return () => {}
  })
}

function * watch (): Generator<CallEffect | TakeEffect | PutEffect, *, *> {
  const channel = yield call(subscribe)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export default function * (): Generator<IOEffect, *, *> {
  yield [
    fork(watch),
  ]
}
