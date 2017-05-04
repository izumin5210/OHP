// @flow
import run from 'framework/run'
import configureStore from 'store/configure'

import CreatorContainer from 'containers/CreatorContainer'

const store = configureStore({})
const containerElement = document.getElementById('container')

if (containerElement != null) {
  run(
    <CreatorContainer />,
    containerElement,
    store,
  )
}
