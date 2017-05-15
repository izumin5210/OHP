// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import type { Location } from 'react-router'

import entities from './entities'
import exportAsPdf from './exportAsPdf'

import type { EntitiesState } from './entities'
import type { ExportAsPdfState } from './exportAsPdf'

export type RootState = {
  entities: EntitiesState,
  exportAsPdf: ExportAsPdfState,
  router: ?Location,
}

export default combineReducers({
  entities,
  exportAsPdf,
  router: routerReducer,
})
