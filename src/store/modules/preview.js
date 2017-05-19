// @flow
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

import type { Action } from 'redux-actions'

/* ======= Types ======= */

export type PreviewStateConfig = {
  width: number,
}

const defaultValue: PreviewStateConfig = {
  width: 0,
}

export class PreviewState extends Record(defaultValue) {
  // HACK: for typecheck
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<PreviewStateConfig>) {
    super(values)
  }

  // HACK: for typecheck
  width: number

  // HACK: for typecheck
  set: <K: $Keys<PreviewStateConfig>>(key: K, value: any) => PreviewState;
}

const initialState = new PreviewState()

/* ======= Actions ======= */

const SET_WIDTH = 'preview:width:set'
type SetWidth = Action<number, void>
export const setWidth = createAction(
  SET_WIDTH,
  (width: number) => width,
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
}, initialState)
