// @flow
import createSagaMiddleware, { END } from 'redux-saga'
import {
  ConnectedRouter as Router,
  routerMiddleware as createRouterMiddleware,
} from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import run from 'framework/run'

import { app as configureStore } from 'store/configure'
import sagas from 'store/sagas'

import { app as routes } from 'routes'

const history = createHistory()
const routerMiddleware = createRouterMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({}, sagaMiddleware, routerMiddleware)

// $FlowFixMe
store.runSaga = sagaMiddleware.run
// $FlowFixMe
store.close = () => store.dispatch(END)
store.runSaga(sagas)

const containerElement = document.getElementById('container')
const component = (
  <Router {...{ history }}>
    { routes }
  </Router>
)

if (containerElement != null) {
  run(
    component,
    containerElement,
    store,
  )
}
