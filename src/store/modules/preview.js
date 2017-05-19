// @flow
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

import type { Action } from 'redux-actions'
import type { VFile } from 'vfile'

/* ======= Types ======= */

export type PreviewStateConfig = {
  width: number,
  body: ?VFile,
  outline: ?VFile,
}

const defaultValue: PreviewStateConfig = {
  width: 0,
  body: null,
  outline: null,
}

export class PreviewState extends Record(defaultValue) {
  // HACK: for typecheck
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<PreviewStateConfig>) {
    super(values)
  }

  // HACK: for typecheck
  width: number
  body: ?VFile
  outline: ?VFile

  // HACK: for typecheck
  set: <K: $Keys<PreviewStateConfig>>(key: K, value: any) => PreviewState;
}

const initialState = new PreviewState()

/* ======= Actions ======= */

export const process = createAction('preview:process')

const SET_WIDTH = 'preview:width:set'
type SetWidth = Action<number, void>
export const setWidth = createAction(
  SET_WIDTH,
  (width: number) => width,
)

const SET_BODY = 'preview:body:set'
type SetBody = Action<VFile, void>
export const setBody = createAction(
  SET_BODY,
  (body: VFile) => body
)

const SET_OUTLINE = 'preview:outline:set'
type SetOutline = Action<VFile, void>
export const setOutline = createAction(
  SET_OUTLINE,
  (body: VFile) => body
)

/* ======= Reducer ======= */

export default handleActions({
  // HACK: for typecheck
  // [setWidth]: (state: PreviewState, action: SetWidth) => {
  [SET_WIDTH]: (state: PreviewState, action: SetWidth) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    return state.set('width', action.payload)
  },

  // HACK: for typecheck
  // [SetBody]: (state: PreviewState, action: SetBody) => {
  [SET_BODY]: (state: PreviewState, action: SetBody) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    return state.set('body', action.payload)
  },

  // HACK: for typecheck
  // [SetOutline]: (state: PreviewState, action: SetOutline) => {
  [SET_OUTLINE]: (state: PreviewState, action: SetOutline) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    return state.set('outline', action.payload)
  },
}, initialState)
