// @flow
import { PureComponent } from 'react'
import Measure from 'react-measure'
import scrollParent from 'scrollparent'
import SweetScroll from 'sweet-scroll'

import type { Dimension } from 'react-measure'

import SlideWrapper from './SlideWrapper'

type Props = {
  bodyElement: React$Element<*>,
  width: number,
  currentPageOrder: number,
  setWidth: (width: number) => any,
}

export default class SlidePreview extends PureComponent<void, Props, void> {
  static scrollOptions = {
    duration: 500,
    // easing: 'easeOutExpo',
    easing: 'easeOutQuint',
    verticalScroll: true,
    horizontalScroll: false,
    // quickMode: true,
  }

  // for lint
  props: Props
  scroller: SweetScroll

  componentDidUpdate ({ currentPageOrder: prevCurrentPageOrder }: Props) {
    const { currentPageOrder, width } = this.props
    if (currentPageOrder !== prevCurrentPageOrder) {
      // NOTE: 16px: spacing between pages
      // FIXME: adjust size params automatically
      this.scroller.toTop(currentPageOrder * (768 * (width / 1024) + 16))
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
      <SlideWrapper
        innerRef={(el) => {
          this.scroller = new SweetScroll(SlidePreview.scrollOptions, scrollParent(el))
        }}
      >
        { el }
      </SlideWrapper>
    )
  }
}
