// @flow
import SplitPane from 'react-split-pane'

import type { Element } from 'react'

import styles from './View.css'

type Props = {
  children?: Element<*> | Array<Element<*>>,
}

export default function View ({ children }: Props) {
  return (
    <SplitPane
      split='vertical'
      defaultSize='50%'
      resizerClassName={styles.resizer}
    >
      { children }
    </SplitPane>
  )
}
