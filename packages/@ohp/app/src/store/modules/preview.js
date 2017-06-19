// @flow
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

import type { Element } from 'react'
import type { Action } from 'redux-actions'

import Page from 'entities/Page'
import wrapStateWith from 'utils/wrapStateWith'

import type { FetchStatus } from 'types'

/* ======= Types ======= */

export type PreviewStateConfig = {
  width: number,
  body: ?Element<any>,
  outline: ?Element<any>,
  styles: Array<string>,
  meta: Object,
  currentPageUid: string,
  fetchStatus: FetchStatus,
}

const defaultValue: PreviewStateConfig = {
  width: 0,
  body: null,
  outline: null,
  styles: [],
  meta: {},
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
  body: ?Element<any>
  outline: ?Element<any>
  styles: Array<string>
  meta: Object
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
type SetBody = Action<Element<any>, void>
export const setBody = createAction(
  SET_BODY,
  (body: Element<any>) => body
)

const SET_OUTLINE = 'preview:outline:set'
type SetOutline = Action<Element<any>, void>
export const setOutline = createAction(
  SET_OUTLINE,
  (outline: Element<any>) => outline
)

const SET_STYLES = 'preview:styles:set'
type SetStyles = Action<Array<string>, void>
export const setStyles = createAction(
  SET_STYLES,
  (styles: Array<string>) => styles
)

const SET_META = 'preview:meta:set'
type SetMeta = Action<Object, void>
export const setMeta = createAction(
  SET_META,
  (meta: Object) => meta,
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

  // HACK: for typecheck
  // [SetStyle]: (state: PreviewState, action: SetStyles) => {
  [SET_STYLES]: (state: PreviewState, action: SetStyles) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    return state.set('styles', action.payload)
  },

  // HACK: for typecheck
  // [SetMeta]: (state: PreviewState, action: SetMeta) => {
  [SET_META]: (state: PreviewState, action: SetMeta) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    return state.set('meta', action.payload)
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
