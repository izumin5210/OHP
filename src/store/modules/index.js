// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import type { Location } from 'react-router'

import entities from './entities'
import exportAsPdf from './exportAsPdf'
import editorState from './editorState'
import previewState from './previewState'

import type { EntitiesState } from './entities'
import type { ExportAsPdfState } from './exportAsPdf'
import type { EditorState } from './editorState'
import type { PreviewState } from './previewState'

export type RootState = {
  entities: EntitiesState,
  exportAsPdf: ExportAsPdfState,
  editorState: EditorState,
  previewState: PreviewState,
  router: ?Location,
}

export default combineReducers({
  entities,
  exportAsPdf,
  editorState,
  previewState,
  router: routerReducer,
})
