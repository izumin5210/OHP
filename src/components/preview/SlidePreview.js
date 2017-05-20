// @flow
import { PureComponent } from 'react'
import Measure from 'react-measure'
import scrollParent from 'scrollparent'

import type { Dimension } from 'react-measure'

import styles from './SlidePreview.css'

type Props = {
  bodyElement: React$Element<*>,
  width: number,
  currentPageOrder: number,
  setWidth: (width: number) => any,
}

export default class SlidePreview extends PureComponent<void, Props, void> {
  // for lint
  props: Props
  el: HTMLElement

  componentDidUpdate ({ currentPageOrder: prevCurrentPageOrder }: Props) {
    const { currentPageOrder, width } = this.props
    if (currentPageOrder !== prevCurrentPageOrder) {
      // NOTE: 16px: spacing between pages
      // FIXME: adjust size params automatically
      this.el.scrollTop = currentPageOrder * (768 * (width / 1024) + 16)
    }
  }

  onMeasure = ({ width }: Dimension) => {
    this.props.setWidth(width)
  }

  render () {
    const { bodyElement } = this.props

    const el = (bodyElement != null) ? (
      <Measure onMeasure={this.onMeasure}>
        { bodyElement }
      </Measure>
    ) : null

    return (
      <div className={styles.pages} ref={(el) => { this.el = scrollParent(el) }}>
        { el }
      </div>
    )
  }
}
