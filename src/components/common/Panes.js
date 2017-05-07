// @flow
import SplitPane from 'react-split-pane'

import type { Element } from 'react'

import styles from './Panes.css'

type Props = {
  split: 'vertical' | 'horizontal',
  children?: Element<*> | Array<Element<*>>,
}

export default function Panes ({ children, ...rest }: Props) {
  return (
    <SplitPane
      {...rest}
      resizerClassName={styles.resizer}
      paneStyle={{ overflowY: 'scroll' }}
    >
      { children }
    </SplitPane>
  )
}
