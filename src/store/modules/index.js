// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import type { Location } from 'react-router'

import entities from './entities'
import exportAsPdf from './exportAsPdf'
import editor from './editor'
import preview from './preview'

import type { EntitiesState } from './entities'
import type { ExportAsPdfState } from './exportAsPdf'
import type { EditorState } from './editor'
import type { PreviewState } from './preview'

export type RootState = {
  entities: EntitiesState,
  exportAsPdf: ExportAsPdfState,
  editor: EditorState,
  preview: PreviewState,
  router: ?Location,
}

export default combineReducers({
  entities,
  exportAsPdf,
  editor,
  preview,
  router: routerReducer,
})
