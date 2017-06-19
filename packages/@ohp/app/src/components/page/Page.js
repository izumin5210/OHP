// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import type { Children } from 'react'
import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'

import Page from 'entities/Page'
import * as Actions from 'store/modules/entities/pages'
import { isExportingAsPdf } from 'store/selectors/exportAsPdf'
import { getWidth, getBaseFontSize, getStyles } from 'store/selectors/preview'

import type { RootState } from 'store/modules'
import type { Position } from 'types'

import Content from './Content'
import StyleScoper from './StyleScoper'
import Wrapper from './Wrapper'

type RequiredProps = {
  className: string,
  children?: Children,
  beginAt: string,
  endAt: string,
  beginLineAt: string,
  beginColumnAt: string,
  endLineAt: string,
  endColumnAt: string,
}

type InjectedProps = {
  width: number,
  baseFontSize: number,
  exportingAsPdf: boolean,
  userStyles: Array<string>,
  setPositions: (uid: string, { beginAt: ?Position, endAt: ?Position }) => any,
  remove: (uid: string) => any,
}

type Props = RequiredProps & InjectedProps

type State = {
  uid: string,
}

const connector: Connector<RequiredProps, Props> = connect(
  (state: RootState) => ({
    width: getWidth(state),
    baseFontSize: getBaseFontSize(state) || 36,
    exportingAsPdf: isExportingAsPdf(state),
    userStyles: getStyles(state),
  }),
  (dispatch: Dispatch<Action<any, any>>) => ({
    setPositions: (
      uid: string,
      positions: { beginAt: ?Position, endAt: ?Position },
    ) => dispatch(Actions.setPositions(uid, positions)),
    remove: (uid: string) => dispatch(Actions.remove(uid)),
  }),
)

class PageContainer extends PureComponent<void, Props, State> {
  static toPosition (lineAtStr: ?string, columnAtStr: ?string): ?Position {
    if (lineAtStr != null && columnAtStr != null) {
      return { row: parseInt(lineAtStr, 10), column: parseInt(columnAtStr, 10) }
    }
    return null
  }

  constructor (props: Props) {
    super(props)
    console.log(props)
    this.state = {
      uid: Page.generateUid(),
    }
  }

  props: Props
  state: State

  componentDidMount () {
    const { beginLineAt, beginColumnAt, endLineAt, endColumnAt } = this.props
    this.setPositions(beginLineAt, beginColumnAt, endLineAt, endColumnAt)
  }

  componentWillReceiveProps ({ beginLineAt, beginColumnAt, endLineAt, endColumnAt }: Props) {
    if (
      beginLineAt !== this.props.beginLineAt ||
        beginColumnAt !== this.props.beginColumnAt ||
        endLineAt !== this.props.endLineAt ||
        endColumnAt !== this.props.endColumnAt
    ) {
      this.setPositions(beginLineAt, beginColumnAt, endLineAt, endColumnAt)
    }
  }

  componentWillUnmount () {
    this.props.remove(this.state.uid)
  }

  setPositions (
    beginLineAt?: string,
    beginColumnAt?: string,
    endLineAt?: string,
    endColumnAt?: string,
  ) {
    const beginAt = PageContainer.toPosition(beginLineAt, beginColumnAt)
    const endAt = PageContainer.toPosition(endLineAt, endColumnAt)
    assert(beginAt == null || ('row' in beginAt && 'column' in beginAt))
    assert(endAt == null || ('row' in endAt && 'column' in endAt))
    this.props.setPositions(this.state.uid, { beginAt, endAt })
  }

  render () {
    const { width, className, children, baseFontSize, exportingAsPdf, userStyles } = this.props
    return (
      <Wrapper
        {...{ baseFontSize }}
        screenWidth={width}
        exporting={exportingAsPdf}
      >
        <StyleScoper>
          <Content {...{ className, userStyles }}>
            { children }
          </Content>
        </StyleScoper>
      </Wrapper>
    )
  }
}

export default connector(PageContainer)
