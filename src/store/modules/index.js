// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import type { Location } from 'react-router'

import entities from './entities'
import exportAsPdf from './exportAsPdf'
import editorState from './editorState'

import type { EntitiesState } from './entities'
import type { ExportAsPdfState } from './exportAsPdf'
import type { EditorState } from './editorState'

export type RootState = {
  entities: EntitiesState,
  exportAsPdf: ExportAsPdfState,
  editorState: EditorState,
  router: ?Location,
}

export default combineReducers({
  entities,
  exportAsPdf,
  editorState,
  router: routerReducer,
})
