// @flow
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

import type { Action } from 'redux-actions'
import type { VFile } from 'vfile'

import Page from 'entities/Page'
import wrapStateWith from 'utils/wrapStateWith'

import type { FetchStatus } from 'types'

/* ======= Types ======= */

export type PreviewStateConfig = {
  width: number,
  body: ?VFile,
  outline: ?VFile,
  currentPageUid: string,
  fetchStatus: FetchStatus,
}

const defaultValue: PreviewStateConfig = {
  width: 0,
  body: null,
  outline: null,
  currentPageUid: new Page().uid,
  fetchStatus: 'none',
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
  currentPageUid: string
  fetchStatus: FetchStatus

  // HACK: for typecheck
  set: <K: $Keys<PreviewStateConfig>>(key: K, value: any) => PreviewState;
}

const initialState = new PreviewState()

/* ======= Actions ======= */

const PROCESS = 'preview:process'
export const process = createAction(PROCESS)

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

const SET_CURRENT_PAGE_UID = 'preview:currentPageUid:set'
type SetCurrentPageUid = Action<string, void>
export const setCurrentPageUid = createAction(
  SET_CURRENT_PAGE_UID,
  (uid: string) => uid,
)

/* ======= Reducer ======= */

const reducer = handleActions({
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
    return state.set('body', action.payload).set('fetchStatus', 'loaded')
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

  // [setCurrentPageUid]: (state: PreviewState, action: SetCurrentPageUid) => {
  [SET_CURRENT_PAGE_UID]: (state: PreviewState, action: SetCurrentPageUid) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    return state.set('currentPageUid', action.payload)
  },

  // [process]: (state: PreviewState) => {
  [PROCESS]: (state: PreviewState) => {
    return state.set('fetchStatus', 'loading')
  },
}, initialState)

export default wrapStateWith(PreviewState, reducer, initialState)
