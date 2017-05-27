// @flow
import {
  ConnectedRouter as Router,
  routerMiddleware as createRouterMiddleware,
} from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import { ipcRenderer } from 'electron'

import run from 'framework/run'

import configureStore from 'store/configure'
import reducer, { RootState } from 'store/modules'
import sagas from 'store/sagas'
import * as PreviewActions from 'store/modules/preview'

import { app as routes } from 'routes'

function init (initialState: RootState) {
  const history = createHistory()
  const routerMiddleware = createRouterMiddleware(history)
  const store = configureStore(reducer, initialState, routerMiddleware)

  // $FlowFixMe
  store.runSaga(sagas)
  store.dispatch(PreviewActions.process())

  const containerElement = document.getElementById('container')
  const createComponent = (el: any) => (
    <Router {...{ history }}>
      {el}
    </Router>
  )

  if (containerElement != null) {
    run(createComponent(routes), containerElement, store)

    if (process.env.NODE_ENV !== 'production' && module.hot) {
      // $FlowFixMe
      module.hot.accept('routes', () => {
        run(createComponent(require('routes').app), containerElement, store)
      })
      // $FlowFixMe
      module.hot.accept('store/modules', () => {
        store.replaceReducer(require('store/modules').default)
      })
      // $FlowFixMe
      module.hot.accept('store/sagas', () => {
        // $FlowFixMe
        store.close()
        // $FlowFixMe
        store.runSaga(require('store/sagas').default)
      })
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.once('initialState', (_e, initialState) => {
    init(new RootState(initialState))
  })
})
