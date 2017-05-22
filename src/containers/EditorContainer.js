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
import { Editor } from 'components/editor'

import type { RootState } from 'store/modules'
import type { KeyboardHandler, Position } from 'types'
import type Page from 'entities/Page'

type RequiredProps = {
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

const connector: Connector< RequiredProps, Props> = connect(
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

class EditorContainer extends PureComponent<void, Props, void> {
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
    const { url, body, keyboardHandler, currentPage } = this.props
    return (
      <Editor
        {...{ url, body, keyboardHandler, currentPage }}
        setBody={this.handleChange}
        setCursor={this.handleCursorChange}
      />
    )
  }
}

export default connector(EditorContainer)
