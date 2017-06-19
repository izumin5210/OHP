// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Element } from 'react'
import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'

import { getBody } from 'store/selectors/preview'
import * as Actions from 'store/modules/exportAsPdf'

import type { RootState } from 'store/modules'

import Wrapper from './Wrapper'

type RequiredProps = {
}

type InjectedProps = {
  bodyElement: ?Element<any>,
  startExporting: () => any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    bodyElement: getBody(state),
  }),
  (dispatch: Dispatch<Action<*, *>>) => ({
    startExporting: () => dispatch(Actions.start())
  }),
)

class Container extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  componentDidMount () {
    this.props.startExporting()
  }

  render () {
    const { bodyElement } = this.props
    return (
      <Wrapper>
        { bodyElement }
      </Wrapper>
    )
  }
}

export default connector(Container)
