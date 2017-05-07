// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Connector } from 'react-redux'

import { getRenderBodyElement } from 'store/selectors/processor'
import { SlidePreview } from 'components/preview'

import type { RootState } from 'store/modules'

type RequiredProps = {
}

type InjectedProps = {
  renderBodyElement: ({ pageClassName: string }) => React$Element<*>,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    renderBodyElement: getRenderBodyElement(state),
  }),
)

class PreviewContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    const { renderBodyElement } = this.props
    return (
      <SlidePreview {...{ renderBodyElement }} />
    )
  }
}

export default connector(PreviewContainer)
