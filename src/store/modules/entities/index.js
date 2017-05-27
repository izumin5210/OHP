// @flow
import { combineReducers } from 'redux-immutable'
import { Record } from 'immutable'

import documentReducer, { DocumentState } from './document'
import pagesReducer, { PagesState } from './pages'

export type EntitiesStateConfig = {
  document: DocumentState,
  pages: PagesState,
}

const defaultValues = {
  document: new DocumentState(),
  pages: new PagesState(),
}

export class EntitiesState extends Record(defaultValues) {
  constructor (values: $Shape<EntitiesStateConfig> = defaultValues) {
    const { document, pages } = values
    if (!(document instanceof DocumentState)) {
      values.document = new DocumentState(document)
    }
    if (!(pages instanceof PagesState)) {
      values.pages = new PagesState(pages)
    }
    super(values)
    assert(this.document instanceof DocumentState)
    assert(this.pages instanceof PagesState)
  }

  // for typecheck
  document: DocumentState
  pages: PagesState
}

export default combineReducers({
  document: documentReducer,
  pages: pagesReducer,
}, EntitiesState)
