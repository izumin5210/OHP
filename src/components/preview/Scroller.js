// @flow
import { PureComponent } from 'react'
import scrollParent from 'scrollparent'
import SweetScroll from 'sweet-scroll'

import type { Children } from 'react'

import Wrapper from './Wrapper'

type Props = {
  width: number,
  currentPageOrder: number,
  children?: ?Children,
}

export default class Scroller extends PureComponent<void, Props, void> {
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

  render () {
    return (
      <Wrapper
        innerRef={(el) => {
          this.scroller = new SweetScroll(Scroller.scrollOptions, scrollParent(el))
        }}
      >
        { this.props.children }
      </Wrapper>
    )
  }
}
