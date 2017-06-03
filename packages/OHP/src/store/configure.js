// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import type { Reducer, Middleware } from 'redux'

export default function configure (
  reducer: Reducer<*, *>,
  initialState: any,
  ...middlewares: Array<Middleware<*, *>>
) {
  const sagaMiddleware = createSagaMiddleware()
  let storeEnhancer

  if (process.env.NODE_ENV === 'production') {
    storeEnhancer = applyMiddleware(...middlewares, sagaMiddleware)
  } else {
    const createLogger = require('redux-logger').createLogger
    const middleware = applyMiddleware(
      ...middlewares,
      sagaMiddleware,
      createLogger(),
    )
    const hasExt = typeof window === 'object' && !!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    const composeEnhancers = hasExt ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
    storeEnhancer = composeEnhancers(middleware)
  }

  const store = createStore(
    reducer,
    initialState,
    storeEnhancer,
  )

  // $FlowFixMe
  store.runSaga = sagaMiddleware.run
  // $FlowFixMe
  store.close = () => store.dispatch(END)

  return store
}
