// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Connector } from 'react-redux'

import { getOutline } from 'store/selectors/preview'

import type { RootState } from 'store/modules'

import Wrapper from './Wrapper'

type RequiredProps = {
}

type InjectedProps = {
  outlineElement: any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector<RequiredProps, Props> = connect(
  (state: RootState) => ({
    outlineElement: (getOutline(state) || { contents: null }).contents,
  }),
)

class Outline extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    const { outlineElement } = this.props
    return (
      <Wrapper>
        { outlineElement }
      </Wrapper>
    )
  }
}

export default connector(Outline)
