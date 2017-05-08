// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import type { Reducer } from 'redux'

export default function factory (reducer: Reducer<*, *>) {
  return configure

  function configure (initialState: any) {
    let storeEnhancer

    if (process.env.NODE_ENV === 'production') {
      storeEnhancer = applyMiddleware()
    } else {
      const createLogger = require('redux-logger').createLogger
      const DevTools = require('framework/DevTools').default
      const hasExt = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      storeEnhancer = compose(
        applyMiddleware(
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
