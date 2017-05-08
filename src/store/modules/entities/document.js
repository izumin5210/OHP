/* @flow */
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

import Document from 'entities/Document'

import type { Action } from 'redux-actions'

/* ======== State ======= */

export type DocumentStateConfig = {
  entity: Document,
}

const defaultValue: $Shape<DocumentStateConfig> = {
  entity: new Document(),
}

export class DocumentState extends Record(defaultValue) {
  // To suppress a following error:
  //   constructor call. Type is incompatible with (unclassified use type: ObjTestT) any member of intersection type
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<DocumentStateConfig>) {
    super(values)
  }

  entity: Document
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

/* ======== Reducer ======= */

export default handleActions({
  [open.toString()]: (state: DocumentState, action: Open) => {
    const { payload, error: isError } = action
    if (!isError && !(payload instanceof Error)) {
      const { url, body } = payload
      return state.set('entity', new Document({ url, body }))
    }
    return state
  },

  [setBody.toString()]: (state: DocumentState, action: SetBody) => {
    const { payload: body, error: isError } = action
    if (!isError) {
      return state.setIn(['entity', 'body'], body)
    }
    return state
  },
}, initialState)
