// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import remark from 'remark'
import remarkRenderer from 'remark-react'

import type { Connector } from 'react-redux'

import { getBody } from 'store/selectors/entities/document'

import type { RootState } from 'store/modules'

type RequiredProps = {
}

type InjectedProps = {
  body: string,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    body: getBody(state),
  }),
)

class PreviewContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    return (
      <div>
        { remark().use(remarkRenderer).processSync(this.props.body).contents }
      </div>
    )
  }
}

export default connector(PreviewContainer)
