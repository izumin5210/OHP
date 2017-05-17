// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import Measure from 'react-measure'
import throttle from 'lodash/throttle'

import type { Children } from 'react'
import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'
import type { Dimension } from 'react-measure'

import Page from 'entities/Page'
import * as Actions from 'store/modules/entities/pages'
import { isExportingAsPdf } from 'store/selectors/exportAsPdf'
import { getCursorPosition } from 'store/selectors/editorState'
import { getBodyAst, getBaseFontSize } from 'store/selectors/processor'
import { Page as PageComponent } from 'components/preview'

import type { RootState } from 'store/modules'
import type { Position } from 'types'

type RequiredProps = {
  className: string,
  children?: Children,
  beginAt: string,
  endAt: string,
}

type InjectedProps = {
  baseFontSize: number,
  exportingAsPdf: boolean,
  cursorPosition: Position,
  userStyles: Array<string>,
  setPositions: (uid: string, startAt: ?Position, endAt: ?Position) => any,
  remove: (uid: string) => any,
}

type Props = RequiredProps & InjectedProps

type State = {
  uid: string,
  width: number,
}

const connector: Connector<RequiredProps, Props> = connect(
  (state: RootState) => ({
    baseFontSize: getBaseFontSize(state) || 36,
    exportingAsPdf: isExportingAsPdf(state),
    cursorPosition: getCursorPosition(state),
    userStyles: getBodyAst(state).styles,
  }),
  (dispatch: Dispatch<Action<any, any>>) => ({
    setPositions: (
      uid: string,
      positions: { beginAt: ?Position, endAt: ?Position },
    ) => dispatch(Actions.setPositions(uid, positions)),
    remove: (uid: string) => dispatch(Actions.remove(uid)),
  }),
)

class SlideContainer extends PureComponent<void, Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      uid: Page.generateUid(),
      width: 0,
    }
  }

  props: Props
  state: State

  componentDidMount () {
    const { beginAt, endAt } = this.props
    this.setPositions(beginAt, endAt)
  }

  componentWillReceiveProps ({ beginAt, endAt }: Props) {
    if (beginAt !== this.props.beginAt || endAt !== this.props.endAt) {
      this.setPositions(beginAt, endAt)
    }
  }

  componentWillUnmount () {
    this.props.remove(this.state.uid)
  }

  setPositions (beginAtStr: string, endAtStr: string) {
    const beginAt = JSON.parse(beginAtStr.replace('line', 'row'))
    const endAt = JSON.parse(endAtStr.replace('line', 'row'))
    assert(beginAt == null || ('row' in beginAt && 'column' in beginAt))
    assert(endAt == null || ('row' in endAt && 'column' in endAt))
    delete (beginAt || {}).offset
    delete (endAt || {}).offset
    this.props.setPositions(this.state.uid, { beginAt, endAt })
  }

  onMeasure = throttle(
    ({ width }: Dimension) => {
      if (this.state.width !== width) {
        this.setState({ width })
      }
    },
    500,
  )

  render () {
    const { className, children, baseFontSize, exportingAsPdf, userStyles } = this.props
    const { width } = this.state
    const fontSize = baseFontSize
    return (
      <Measure onMeasure={this.onMeasure}>
        <PageComponent {...{ className, fontSize, width, exportingAsPdf, userStyles }} >
          { children }
        </PageComponent>
      </Measure>
    )
  }
}

export default connector(SlideContainer)
