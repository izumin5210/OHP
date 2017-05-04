// @flow
import { createStore, applyMiddleware, compose } from 'redux'

import reducer from './modules'

export default function configureStore (initialState: any) {
  let storeEnhancer

  if (process.env.NODE_ENV === 'production') {
    storeEnhancer = applyMiddleware()
  } else {
    const createLogger = require('redux-logger').createLogger
    const DevTools = require('../framework/DevTools').default
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
