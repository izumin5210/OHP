/* @flow */
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

import type { Action } from 'redux-actions'
import type { Position } from 'types'

/* ======= Types ======= */

export type EditorStateConfig = {
  cursorPosition: Position,
}

const defaultValue: EditorStateConfig = {
  cursorPosition: { row: 0, column: 0 },
}

export class EditorState extends Record(defaultValue) {
  // HACK: for typecheck
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<EditorStateConfig>) {
    super(values)
  }

  // HACK: for typecheck
  cursorPosition: Position

  // HACK: for typecheck
  set: <K: $Keys<EditorStateConfig>>(key: K, value: any) => EditorState;
}

const initialState = new EditorState()

/* ======= Actions ======= */

const MOVE_CURSOR = 'editor:cursorPosition:move'
type MoveCursor = Action<Position, void>
export const moveCursor = createAction(
  MOVE_CURSOR,
  (payload: Position) => payload,
)

/* ======= Reducer ======= */

export default handleActions({
  // HACK: for typecheck
  // [moveCursor.toString()]: (state: EditorState, action: MoveCursor) => {
  [MOVE_CURSOR]: (state: EditorState, action: MoveCursor) => {
    assert(!action.error)
    if (action.error) {
      return state
    }
    const { payload: pos } = action
    assert('row' in pos)
    assert('column' in pos)
    return state.set('cursorPosition', pos)
  },
}, initialState)
