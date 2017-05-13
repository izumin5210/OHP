/* @flow */
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

import Document from 'entities/Document'

import type { Action } from 'redux-actions'

/* ======== State ======= */

export type DocumentStateConfig = {
  entity: Document,
  saved: boolean,
  lastSavedBody: string,
}

const defaultValue: $Shape<DocumentStateConfig> = {
  entity: new Document(),
  saved: true,
  lastSavedBody: '',
}

export class DocumentState extends Record(defaultValue) {
  // To suppress a following error:
  //   constructor call. Type is incompatible with (unclassified use type: ObjTestT) any member of intersection type
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<DocumentStateConfig>) {
    super(values)
  }

  entity: Document
  saved: boolean
  lastSavedBody: string
}

const initialState = new DocumentState()

/* ======== Actions ======= */

export type OpenPayload = { url: string, body: string }
export type Open = Action<OpenPayload, void>
export const open = createAction(
  'entities:document:open',
  (payload: OpenPayload) => payload,
)

export type SetBody = Action<string, void>
export const setBody = createAction(
  'entities:document:setBody',
  (payload: string) => payload,
)

export type SavePayload = { new: boolean }
export type Save = Action<SavePayload, void>
export const save = createAction(
  'entities:document:save',
  (payload: SavePayload) => payload,
)

export type BeSavedPayload = { url: string }
export type BeSaved = Action<BeSavedPayload, void>
export const beSaved = createAction(
  'entities:document:beSaved',
  (payload: BeSavedPayload) => payload,
)

/* ======== Reducer ======= */

export default handleActions({
  [open.toString()]: (state: DocumentState, action: Open) => {
    const { payload, error: isError } = action
    if (!isError && !(payload instanceof Error)) {
      const { url, body } = payload
      return state
        .set('entity', new Document({ url, body }))
        .set('saved', true)
        .set('lastSavedBody', body)
    }
    return state
  },

  [setBody.toString()]: (state: DocumentState, action: SetBody) => {
    const { payload: body, error: isError } = action
    if (!isError) {
      console.log(body === state.lastSavedBody)
      return state
        .setIn(['entity', 'body'], body)
        .set('saved', body === state.lastSavedBody)
    }
    return state
  },

  [beSaved.toString()]: (state: DocumentState, action: BeSaved) => {
    const { payload, error: isError } = action
    if (!isError && !(payload instanceof Error)) {
      return state
        .setIn(['entity', 'url'], payload.url)
        .set('saved', true)
        .set('lastSavedBody', state.entity.body)
    }
    return state
  },
}, initialState)
