// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Connector } from 'react-redux'

import { getBodyAst } from 'store/selectors/processor'
import { SlidePreview } from 'components/preview'

import type { RootState } from 'store/modules'

type RequiredProps = {
}

type InjectedProps = {
  bodyElement: React$Element<*>,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    bodyElement: getBodyAst(state).contents,
  }),
)

class PreviewContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    const { bodyElement } = this.props
    return (
      <SlidePreview {...{ bodyElement }} />
    )
  }
}

export default connector(PreviewContainer)
