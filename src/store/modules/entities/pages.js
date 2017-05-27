// @flow
import { createAction, handleActions } from 'redux-actions'
import { Map, Record } from 'immutable'

import type { Action } from 'redux-actions'

import Page from 'entities/Page'
import wrapStateWith from 'utils/wrapStateWith'

import type { Position } from 'types'

/* ======= Types ======= */

export type PagesStateConfig = {
  pageByUid: Map<string, Page>,
  topByUid: Map<string, number>,
}

const defaultValue: PagesStateConfig = {
  pageByUid: Map(),
  topByUid: Map(),
}

export class PagesState extends Record(defaultValue) {
  // HACK: for typecheck
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<PagesStateConfig>) {
    super(values)
  }

  // HACK: for typecheck
  pageByUid: Map<string, Page>
  topByUid: Map<string, number>

  // HACK: for typecheck
  set: <K: $Keys<PagesStateConfig>>(key: K, value: any) => PagesState;
  getIn: <V>(keyPath: Iterable<any>, value?: V) => V
  setIn: (keyPath: Iterable<any>, value: any) => PagesState;
}

const initialState = new PagesState()

/* ======= Actions ======= */

const SET_POSITIONS = 'entities:pages:setPositions'
type SetPositions = Action<{ uid: string, beginAt: ?Position, endAt: ?Position }, void>
export const setPositions = createAction(
  SET_POSITIONS,
  (
    uid: string,
    { beginAt, endAt }: { beginAt: ?Position, endAt: ?Position },
  ) => ({ uid, beginAt, endAt }),
)

const SET_TOP = 'entities:pages:setTop'
type SetTop = Action<{ uid: string, top: number }, void>
export const setTop = createAction(
  SET_TOP,
  (uid: string, top: number) => ({ uid, top }),
)

const REMOVE = 'entities:pages:remove'
type Remove = Action<string, void>
export const remove = createAction(
  REMOVE,
  (uid: string) => uid,
)

/* ======= Reducer ======= */

const reducer = handleActions({
  // HACK: for typecheck
  // [setPositions]: (state: PagesState, action: SetPositions) => {
  [SET_POSITIONS]: (state: PagesState, action: SetPositions) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    const { uid, beginAt, endAt } = action.payload
    assert(uid.length === Page.uidLength)
    const keyPath = ['pageByUid', uid]
    const page = state.getIn(keyPath, new Page({ uid }))
    return state.setIn(
      keyPath,
      page.set('beginAt', beginAt).set('endAt', endAt),
    )
  },

  // HACK: for typecheck
  // [setTop]: (state: PagesState, action: SetTop) => {
  [SET_TOP]: (state: PagesState, action: SetTop) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    const { uid, top } = action.payload
    assert(uid.length === Page.uidLength)
    return state.setIn(['topByUid', uid], top)
  },

  // HACK: for typecheck
  // [remove]: (state: PagesState, action: Remove) => {
  [REMOVE]: (state: PagesState, action: Remove) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    const { payload: uid } = action
    // NOTE: Immutable.RecordClass does not has `removeIn` and `deleteIn`
    return state
      .set('pageByUid', state.pageByUid.remove(uid))
      .set('topByUid', state.topByUid.remove(uid))
  }
}, initialState)

export default wrapStateWith(PagesState, reducer, initialState)
