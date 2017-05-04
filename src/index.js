// @flow
import run from 'framework/run'
import configureStore from 'store/configure'

const store = configureStore({})
const containerElement = document.getElementById('container')

if (containerElement != null) {
  run(
    <h1>It works!</h1>,
    containerElement,
    store,
  )
}
