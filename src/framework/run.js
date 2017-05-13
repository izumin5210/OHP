// @flow
import './setup'
import { render } from 'react-dom'

import type { Element } from 'react'
import type { Store } from 'redux'

import Root from './Root'

export default function run (
  element: Element<*>,
  container: HTMLElement,
  store: Store<*, *>
) {
  if (process.env.NODE_ENV === 'production') {
    render(
      <Root {...{ element, store }} />,
      container,
    )
  } else {
    const { AppContainer } = require('react-hot-loader')
    render(
      <AppContainer>
        <Root {...{ element, store }} />
      </AppContainer>,
      container,
    )
  }
}
