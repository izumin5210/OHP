// @flow
import run from 'framework/run'
import { print as configureStore } from 'store/configure'

import PreviewContainer from 'containers/PreviewContainer'

const store = configureStore({})
const containerElement = document.getElementById('container')

if (containerElement != null) {
  run(
    <PreviewContainer />,
    containerElement,
    store,
  )
}
