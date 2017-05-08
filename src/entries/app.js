// @flow
import createSagaMiddleware, { END } from 'redux-saga'

import run from 'framework/run'

import { app as configureStore } from 'store/configure'
import sagas from 'store/sagas'
import CreatorContainer from 'containers/CreatorContainer'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({}, sagaMiddleware)
// $FlowFixMe
store.runSaga = sagaMiddleware.run
// $FlowFixMe
store.close = () => store.dispatch(END)
// $FlowFixMe
store.runSaga(sagas)

const containerElement = document.getElementById('container')

if (containerElement != null) {
  run(
    <CreatorContainer />,
    containerElement,
    store,
  )
}
