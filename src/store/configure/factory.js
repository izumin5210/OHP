// @flow
import { createStore, applyMiddleware, compose } from 'redux'

import type { Reducer, Middleware } from 'redux'

export default function factory (reducer: Reducer<*, *>) {
  return configure

  function configure (initialState: any, ...middlewares: Array<Middleware<*, *>>) {
    let storeEnhancer

    if (process.env.NODE_ENV === 'production') {
      storeEnhancer = applyMiddleware(...middlewares)
    } else {
      const createLogger = require('redux-logger').createLogger
      const DevTools = require('framework/DevTools').default
      const hasExt = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      storeEnhancer = compose(
        applyMiddleware(
          ...middlewares,
          createLogger(),
        ),
        hasExt ? window.devToolsExtension() : DevTools.instrument(),
      )
    }

    const store = createStore(
      reducer,
      initialState,
      storeEnhancer,
    )

    return store
  }
}
