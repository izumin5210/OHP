// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import type { Location } from 'react-router'

import entities from './entities'

export type RootState = {
  entities: typeof entities,
  router: ?Location,
}

export default combineReducers({
  entities,
  router: routerReducer,
})
