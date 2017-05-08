// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'

import { getBodyElement } from 'store/selectors/processor'
import * as Actions from 'store/modules/exportAsPdf'
import { Target } from 'components/print'

import type { RootState } from 'store/modules'

type RequiredProps = {
}

type InjectedProps = {
  bodyElement: React$Element<*>,
  startExporting: () => any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    bodyElement: getBodyElement(state),
  }),
  (dispatch: Dispatch<Action<*, *>>) => ({
    startExporting: () => dispatch(Actions.start())
  }),
)

class PrintContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  componentDidMount () {
    this.props.startExporting()
  }

  render () {
    const { bodyElement } = this.props
    return (
      <Target>
        { bodyElement }
      </Target>
    )
  }
}

export default connector(PrintContainer)
