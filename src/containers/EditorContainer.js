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
import { getOutline } from 'store/selectors/preview'
import { getCurrentPage } from 'store/selectors/pages'
import Panes from 'components/common/Panes'
import { Editor, Outline } from 'components/editor'

import type { RootState } from 'store/modules'
import type { Position } from 'types'
import type Page from 'entities/Page'

type RequiredProps = {
}

type InjectedProps = {
  url: string,
  body: string,
  outlineElement: any,
  currentPage: ?Page,
  setBody: (body: string) => any,
  moveCursor: (pos: Position) => any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    url: getUrl(state),
    body: getBody(state),
    currentPage: getCurrentPage(state),
    outlineElement: (getOutline(state) || { contents: null }).contents,
  }),
  (dispatch: Dispatch<Action<any, any>>) => ({
    setBody: (body: string) => dispatch(DocumentActions.setBody(body)),
    moveCursor: (pos: Position) => dispatch(EditorActions.moveCursor(pos)),
  }),
)

class EditorContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  handleChange = debounce(
    (body: string) => this.props.setBody(body),
    500,
  )

  handleCursorChange = debounce(
    (pos: Position) => this.props.moveCursor(pos),
    500,
  )

  render () {
    const { url, body, currentPage, outlineElement } = this.props
    return (
      <Panes
        split='vertical'
        primary='second'
        minSize={30}
        defaultSize='70%'
      >
        <Outline {...{ outlineElement }} />
        <Editor
          {...{ url, body, currentPage }}
          setBody={this.handleChange}
          setCursor={this.handleCursorChange}
        />
      </Panes>
    )
  }
}

export default connector(EditorContainer)
