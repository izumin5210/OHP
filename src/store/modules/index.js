// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import type { Location } from 'react-router'

import entities from './entities'
import exportAsPdf from './exportAsPdf'
import editorState from './editorState'
import preview from './preview'

import type { EntitiesState } from './entities'
import type { ExportAsPdfState } from './exportAsPdf'
import type { EditorState } from './editorState'
import type { PreviewState } from './preview'

export type RootState = {
  entities: EntitiesState,
  exportAsPdf: ExportAsPdfState,
  editorState: EditorState,
  preview: PreviewState,
  router: ?Location,
}

export default combineReducers({
  entities,
  exportAsPdf,
  editorState,
  preview,
  router: routerReducer,
})
