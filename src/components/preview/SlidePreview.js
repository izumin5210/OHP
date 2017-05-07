// @flow
import { PureComponent } from 'react'

import styles from './SlidePreview.css'

type Props = {
  bodyElement: React$Element<*>,
}

export default class SlidePreview extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    return (
      <div className={styles.pages} >
        { this.props.bodyElement }
      </div>
    )
  }
}
