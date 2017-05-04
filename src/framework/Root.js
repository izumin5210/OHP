// @flow
import { Provider } from 'react-redux'

import type { Element } from 'react'
import type { Store } from 'redux'

let DevTools = null
if (process.env.NODE_ENV !== 'production') {
  DevTools = require('./DevTools').default
}

type Props = {
  element: Element<*>,
  store: Store<*, *>,
}

export default function Root ({ element, store }: Props) {
  return (
    <Provider {...{ store }}>
      <div className='Root'>
        { element }
        { DevTools != null && <DevTools /> }
      </div>
    </Provider>
  )
}
