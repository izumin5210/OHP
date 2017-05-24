// @flow
import { Provider } from 'react-redux'

import type { Element } from 'react'
import type { Store } from 'redux'

type Props = {
  element: Element<*>,
  store: Store<*, *>,
}

export default function Root ({ element, store }: Props) {
  return (
    <Provider {...{ store }}>
      <div className='Root'>
        { element }
      </div>
    </Provider>
  )
}
