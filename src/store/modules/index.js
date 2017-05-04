// @flow
import { combineReducers } from 'redux'

import entities from './entities'

export type RootState = {
  entities: typeof entities,
}

export default combineReducers({
  entities,
})
