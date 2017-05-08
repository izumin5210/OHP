// @flow
import { PureComponent } from 'react'
import type { Children } from 'react'

import styles from './Target.css'

type Props = {
  children?: Children,
}

export default class Target extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    return (
      <div className={styles.target}>
        { this.props.children }
      </div>
    )
  }
}
