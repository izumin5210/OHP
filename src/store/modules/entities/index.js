// @flow
import { combineReducers } from 'redux'

import document from './document'

import type { DocumentState } from './document'

export type EntitiesState = {
  document: DocumentState,
}

export default combineReducers({
  document,
})
