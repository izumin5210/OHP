/* @flow */
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

import Document from 'entities/Document'
import wrapStateWith from 'utils/wrapStateWith'

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
  constructor (values: $Shape<DocumentStateConfig> = defaultValue) {
    const { entity } = values
    if (!(entity instanceof Document)) {
      values.entity = new Document(entity)
    }
    super(values)
    assert(this.entity instanceof Document)
  }

  // HACK: for typecheck
  entity: Document
  saved: boolean
  lastSavedBody: string

  // HACK: for typecheck
  set: <K: $Keys<DocumentState>>(key: K, value: any) => DocumentState;
  setIn: (keyPath: Iterable<any>, value: any) => DocumentState;
}

const initialState = new DocumentState()

/* ======== Actions ======= */

const OPEN = 'entities:document:open'
export type OpenPayload = { url: string, body: string }
export type Open = Action<OpenPayload, void>
export const open = createAction(
  OPEN,
  (payload: OpenPayload) => payload,
)

const SET_BODY = 'entities:document:setBody'
export type SetBody = Action<string, void>
export const setBody = createAction(
  SET_BODY,
  (payload: string) => payload,
)

const SAVE = 'entities:document:save'
export type SavePayload = { new: boolean }
export type Save = Action<SavePayload, void>
export const save = createAction(
  SAVE,
  (payload: SavePayload) => payload,
)

const BE_SAVED = 'entities:document:beSaved'
export type BeSavedPayload = { url: string }
export type BeSaved = Action<BeSavedPayload, void>
export const beSaved = createAction(
  BE_SAVED,
  (payload: BeSavedPayload) => payload,
)

/* ======== Reducer ======= */

const reducer = handleActions({
  // HACK: for typecheck
  // [open]: (state: DocumentState, action: Open) => {
  [OPEN]: (state: DocumentState, action: Open) => {
    if (!action.error) {
      const { url, body } = action.payload
      return state
        .set('entity', new Document({ url, body }))
        .set('saved', true)
        .set('lastSavedBody', body)
    }
    return state
  },

  // HACK: for typecheck
  // [setBody]: (state: DocumentState, action: SetBody) => {
  [SET_BODY]: (state: DocumentState, action: SetBody) => {
    if (!action.error) {
      const { payload: body } = action
      return state
        .setIn(['entity', 'body'], body)
        .set('saved', body === state.lastSavedBody)
    }
    return state
  },

  // HACK: for typecheck
  // [beSaved]: (state: DocumentState, action: BeSaved) => {
  [BE_SAVED]: (state: DocumentState, action: BeSaved) => {
    if (!action.error) {
      return state
        .setIn(['entity', 'url'], action.payload.url)
        .set('saved', true)
        .set('lastSavedBody', state.entity.body)
    }
    return state
  },
}, initialState)

export default wrapStateWith(DocumentState, reducer, initialState)
