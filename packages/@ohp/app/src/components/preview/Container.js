// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import Measure from 'react-measure'
import debounce from 'lodash/debounce'

import type { Element } from 'react'
import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'
import type { ContentRect } from 'react-measure'

import { setWidth } from 'store/modules/preview'
import { getBody, getWidth, getCurrentPageOrder } from 'store/selectors/preview'

import type { RootState } from 'store/modules'

import DotLineLoader from 'components/common/DotLineLoader'
import Scroller from './Scroller'

type RequiredProps = {
}

type InjectedProps = {
  bodyElement: ?Element<*>,
  width: number,
  currentPageOrder: number,
  setWidth: (width: number) => any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    bodyElement: getBody(state),
    width: getWidth(state),
    currentPageOrder: getCurrentPageOrder(state),
  }),
  (dispatch: Dispatch<Action<any, any>>) => ({
    setWidth: debounce(
      (width: number) => dispatch(setWidth(width)),
      300,
      { maxWait: 1000 },
    )
  }),
)

class Container extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  onResize = ({ bounds }: ContentRect) => {
    if (typeof bounds.width === 'number') {
      this.props.setWidth(bounds.width)
    }
  }

  renderContent () {
    const { bodyElement } = this.props

    if (bodyElement == null) {
      return (
        <DotLineLoader fillParent />
      )
    }

    return (
      <Measure
        onResize={this.onResize}
        bounds
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            { bodyElement }
          </div>
        )}
      </Measure>
    )
  }

  render () {
    const { width, currentPageOrder } = this.props
    return (
      <Scroller {...{ width, currentPageOrder }}>
        { this.renderContent() }
      </Scroller>
    )
  }
}

export default connector(Container)
