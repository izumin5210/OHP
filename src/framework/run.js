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
  render(
    <Root {...{ element, store }} />,
    container,
  )
}
