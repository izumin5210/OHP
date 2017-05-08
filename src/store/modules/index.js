// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import type { Location } from 'react-router'

import entities from './entities'
import exportAsPdf from './exportAsPdf'

export type RootState = {
  entities: typeof entities,
  exportAsPdf: typeof exportAsPdf,
  router: ?Location,
}

export default combineReducers({
  entities,
  exportAsPdf,
  router: routerReducer,
})
