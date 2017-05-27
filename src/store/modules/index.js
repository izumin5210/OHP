// @flow
import { combineReducers } from 'redux-immutable'
import { Record } from 'immutable'
import { routerReducer } from 'react-router-redux'

import type { Location } from 'react-router'

import entitiesReducer, { EntitiesState } from './entities'
import exportAsPdfReducer, { ExportAsPdfState } from './exportAsPdf'
import editorReducer, { EditorState } from './editor'
import previewReducer, { PreviewState } from './preview'

export type RootStateConfig = {
  entities: EntitiesState,
  exportAsPdf: ExportAsPdfState,
  editor: EditorState,
  preview: PreviewState,
  router: ?Location,
}

const defaultValues = {
  entities: new EntitiesState(),
  exportAsPdf: new ExportAsPdfState(),
  editor: new EditorState(),
  preview: new PreviewState(),
  router: null,
}

export class RootState extends Record(defaultValues) {
  constructor (values: $Shape<RootStateConfig> = defaultValues) {
    const { entities, exportAsPdf, editor, preview } = values
    if (!(entities instanceof EntitiesState)) {
      values.entities = new EntitiesState(entities)
    }
    if (!(exportAsPdf instanceof ExportAsPdfState)) {
      values.exportAsPdf = new ExportAsPdfState(exportAsPdf)
    }
    if (!(editor instanceof EditorState)) {
      values.editor = new EditorState(editor)
    }
    if (!(preview instanceof PreviewState)) {
      values.preview = new PreviewState(preview)
    }
    super(values)
    assert(this.entities instanceof EntitiesState)
    assert(this.exportAsPdf instanceof ExportAsPdfState)
    assert(this.editor instanceof EditorState)
    assert(this.preview instanceof PreviewState)
  }

  entities: EntitiesState
  exportAsPdf: ExportAsPdfState
  editor: EditorState
  preview: PreviewState
  router: ?Location
}

export default combineReducers({
  entities: entitiesReducer,
  exportAsPdf: exportAsPdfReducer,
  editor: editorReducer,
  preview: previewReducer,
  router: routerReducer,
}, RootState)
