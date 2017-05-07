// @flow
import { PureComponent } from 'react'

import styles from './SlidePreview.css'

type Props = {
  renderBodyElement: ({ pageClassName: string }) => React$Element<*>,
}

export default class SlidePreview extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    return (
      <div
        className={styles.pages}
      >
        { this.props.renderBodyElement({ pageClassName: styles.page }) }
      </div>
    )
  }
}
