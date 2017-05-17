// @flow
import { createSelector } from 'reselect'

import type { RootState } from 'store/modules'
import type {
  EditorState,
  EditorStateConfig,
} from 'store/modules/editorState'

export const getEditorState = ({ editorState }: RootState) => editorState
export const getCursorPosition = createSelector(
  getEditorState,
  ({ cursorPosition }: EditorState & EditorStateConfig) => cursorPosition,
)
