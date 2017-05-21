// @flow
import { createSelector } from 'reselect'

import type { RootState } from 'store/modules'
import type {
  EditorState,
  EditorStateConfig,
} from 'store/modules/editor'

export const getEditorState = ({ editor }: RootState) => editor
export const getCursorPosition = createSelector(
  getEditorState,
  ({ cursorPosition }: EditorState & EditorStateConfig) => cursorPosition,
)
export const getKeyboardHandler = createSelector(
  getEditorState,
  ({ keyboardHandler }: EditorState) => keyboardHandler,
)
