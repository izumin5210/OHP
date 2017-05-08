// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import Measure from 'react-measure'

import type { Children } from 'react'
import type { Connector } from 'react-redux'

import { isExportingAsPdf } from 'store/selectors/exportAsPdf'
import { getBodyAst } from 'store/selectors/processor'
import { Page } from 'components/preview'

import type { RootState } from 'store/modules'

type RequiredProps = {
  children?: Children,
}

type InjectedProps = {
  exportingAsPdf: boolean,
  userStyles: Array<string>,
}

type Props = RequiredProps & InjectedProps

type State = {
  width: number,
}

/* eslint-disable react/no-unused-prop-types */
type Dimension = {
  width: number,
  height: number,
  top: number,
  right: number,
  bottom: number,
  left: number,
}
/* eslint-enable */

const connector: Connector<RequiredProps, Props> = connect(
  (state: RootState) => ({
    exportingAsPdf: isExportingAsPdf(state),
    userStyles: getBodyAst(state).styles,
  }),
)

class SlideContainer extends PureComponent<void, Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      width: 0,
    }
  }

  props: Props
  state: State

  get width (): number {
    // FIXME
    // eslint-disable-next-line react/prop-types
    return this.props.exportingAsPdf ? 1024 : this.state.width
  }

  onMeasure = ({ width }: Dimension) => {
    if (this.state.width !== width) {
      this.setState({ width })
    }
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const { children, userStyles } = this.props
    const { width } = this
    return (
      <Measure onMeasure={this.onMeasure}>
        <Page {...{ width, userStyles }} >
          { children }
        </Page>
      </Measure>
    )
  }
}

export default connector(SlideContainer)
