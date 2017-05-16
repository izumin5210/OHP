// @flow
import { PureComponent } from 'react'
import Measure from 'react-measure'

import type { Dimension } from 'react-measure'

import styles from './SlidePreview.css'

type Props = {
  bodyElement: React$Element<*>,
  setWidth: (width: number) => any,
}

export default class SlidePreview extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  onMeasure = ({ width }: Dimension) => {
    this.props.setWidth(width)
  }

  render () {
    return (
      <div className={styles.pages} >
        <Measure onMeasure={this.onMeasure}>
          { this.props.bodyElement }
        </Measure>
      </div>
    )
  }
}
