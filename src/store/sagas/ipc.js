// @flow
import { call, fork, put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { ipcRenderer as ipc } from 'electron'

import type { CallEffect, IOEffect, PutEffect, TakeEffect } from 'redux-saga/effects'

import * as DocumentActions from 'store/modules/entities/document'
import * as ExportActions from 'store/modules/exportAsPdf'
import * as channels from 'settings/ipc'

function * subscribe () {
  return eventChannel((emit) => {
    ipc.on(channels.entities.document.open, (_e: any, params: { filePath: string, body: string }) => {
      emit(DocumentActions.open(params))
    })

    ipc.on(channels.entities.document.save, () => {
      emit(DocumentActions.save({ new: false }))
    })

    ipc.on(channels.entities.document.beSaved, (_e: any, params: { url: string }) => {
      emit(DocumentActions.beSaved(params))
    })

    ipc.on(channels.exportAsPdf.prepare, () => {
      emit(ExportActions.prepare())
    })

    ipc.on(channels.exportAsPdf.complete, () => {
      emit(ExportActions.complete())
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
