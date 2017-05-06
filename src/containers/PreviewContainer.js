// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Connector } from 'react-redux'

import { getBodyElementRenderer } from 'store/selectors/processor'

import type { RootState } from 'store/modules'

type RequiredProps = {
}

type InjectedProps = {
  bodyElement: React$Element<*>,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    bodyElement: getBodyElementRenderer(state)({ pageClassName: 'hoge' }),
  }),
)

class PreviewContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    return (
      <div>
        { this.props.bodyElement }
      </div>
    )
  }
}

export default connector(PreviewContainer)
