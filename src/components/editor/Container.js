// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'

import * as DocumentActions from 'store/modules/entities/document'
import * as EditorActions from 'store/modules/editor'
import { getUrl, getBody } from 'store/selectors/entities/document'
import { getKeyboardHandler } from 'store/selectors/editor'
import { getCurrentPage } from 'store/selectors/pages'

import type { RootState } from 'store/modules'
import type { KeyboardHandler, Position } from 'types'
import type Page from 'entities/Page'

import Editor from './Editor'
import Wrapper from './Wrapper'

type RequiredProps = {
  currentPageRangeClassName?: string,
}

type InjectedProps = {
  url: string,
  body: string,
  keyboardHandler: KeyboardHandler,
  currentPage: ?Page,
  setBody: (body: string) => any,
  moveCursor: (pos: Position) => any,
  loadKeyboardHandler: () => any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector<RequiredProps, Props> = connect(
  (state: RootState) => ({
    url: getUrl(state),
    body: getBody(state),
    keyboardHandler: getKeyboardHandler(state),
    currentPage: getCurrentPage(state),
  }),
  (dispatch: Dispatch<Action<any, any>>) => ({
    setBody: (body: string) => dispatch(DocumentActions.setBody(body)),
    moveCursor: (pos: Position) => dispatch(EditorActions.moveCursor(pos)),
    loadKeyboardHandler: () => dispatch(EditorActions.getKeyboardHandler()),
  }),
)

const defaultProps = {
  currentPageRangeClassName: 'currentPageRange',
}

class Container extends PureComponent<typeof defaultProps, Props, void> {
  static defaultProps = defaultProps

  // for lint
  props: Props

  componentDidMount () {
    this.props.loadKeyboardHandler()
  }

  handleChange = debounce(
    (body: string) => this.props.setBody(body),
    500,
  )

  handleCursorChange = debounce(
    (pos: Position) => this.props.moveCursor(pos),
    500,
  )

  render () {
    const {
      url, body, keyboardHandler,
      currentPage, currentPageRangeClassName,
    } = this.props
    return (
      <Wrapper {...{ currentPageRangeClassName }}>
        <Editor
          {...{
            url,
            body,
            keyboardHandler,
            currentPage,
            currentPageRangeClassName,
          }}
          setBody={this.handleChange}
          setCursor={this.handleCursorChange}
        />
      </Wrapper>
    )
  }
}

export default connector(Container)
