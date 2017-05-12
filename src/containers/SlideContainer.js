// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import Measure from 'react-measure'

import type { Children } from 'react'
import type { Connector } from 'react-redux'

import { isExportingAsPdf } from 'store/selectors/exportAsPdf'
import { getBodyAst, getBaseFontSize } from 'store/selectors/processor'
import { Page } from 'components/preview'

import type { RootState } from 'store/modules'

type RequiredProps = {
  className: string,
  children?: Children,
}

type InjectedProps = {
  baseFontSize: number,
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
    baseFontSize: getBaseFontSize(state) || 36,
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

  onMeasure = ({ width }: Dimension) => {
    if (this.state.width !== width) {
      this.setState({ width })
    }
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const { className, children, baseFontSize, exportingAsPdf, userStyles } = this.props
    const { width } = this.state
    const fontSize = baseFontSize
    return (
      <Measure onMeasure={this.onMeasure}>
        <Page {...{ className, fontSize, width, exportingAsPdf, userStyles }} >
          { children }
        </Page>
      </Measure>
    )
  }
}

export default connector(SlideContainer)
