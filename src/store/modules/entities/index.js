// @flow
import { combineReducers } from 'redux'

import document from './document'
import pages from './pages'

import type { DocumentState } from './document'
import type { PagesState } from './pages'

export type EntitiesState = {
  document: DocumentState,
  pages: PagesState,
}

export default combineReducers({
  document,
  pages,
})
