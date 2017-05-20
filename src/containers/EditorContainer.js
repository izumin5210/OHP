// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/tomorrow'
import 'brace/keybinding/vim'
import debounce from 'lodash/debounce'

import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'

import { defaultBody } from 'settings/constants'
import * as DocumentActions from 'store/modules/entities/document'
import * as EditorActions from 'store/modules/editor'
import { getUrl, getBody } from 'store/selectors/entities/document'
import { getOutline } from 'store/selectors/preview'
import Panes from 'components/common/Panes'
import { Outline } from 'components/editor'

import type { RootState } from 'store/modules'
import type { Position } from 'types'

type RequiredProps = {
}

type InjectedProps = {
  url: string,
  body: string,
  outlineElement: any,
  setBody: (body: string) => any,
  moveCursor: (pos: Position) => any,
}

type Props = RequiredProps & InjectedProps

type State = {
  body: string,
}

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    url: getUrl(state),
    body: getBody(state),
    outlineElement: (getOutline(state) || { contents: null }).contents,
  }),
  (dispatch: Dispatch<Action<any, any>>) => ({
    setBody: (body: string) => dispatch(DocumentActions.setBody(body)),
    moveCursor: (pos: Position) => dispatch(EditorActions.moveCursor(pos)),
  }),
)

class EditorContainer extends PureComponent<void, Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      body: props.body,
    }
  }

  // for lint
  props: Props
  state: State
  editorComponent: AceEditor

  componentDidMount () {
    const { editor } = this.editorComponent
    editor.getSession().getSelection().on('changeCursor', this.handleCursorChange)
    if (this.props.body.length === 0) {
      editor.setValue(defaultBody)
      editor.clearSelection()
    }
  }

  componentWillReceiveProps ({ url, body }: Props) {
    if (url !== this.props.url) {
      this.handleChange(body)
    }
  }

  get insertNewpageDirectiveCommand () {
    return {
      Name: 'Insert newpage directive',
      bindKey: {
        win: 'Ctrl-Enter',
        mac: 'Command-Enter',
      },
      exec: (editor) => {
        const { row } = editor.getCursorPosition()
        const lineLength = editor.getSession().getLine(row).length
        const br = `\n${lineLength > 0 ? '\n' : ''}`
        editor.moveCursorTo(row, lineLength)
        editor.insert(`${br}<!-- newpage -->${br}`)
      },
    }
  }

  get commands () {
    return [
      this.insertNewpageDirectiveCommand,
    ]
  }

  handleChange = (body: string) => {
    this.setState({ body }, () => this.setBody(this.state.body))
  }

  setBody = debounce(
    (body: string) => this.props.setBody(body),
    500,
  )

  handleCursorChange = debounce(
    (_e: any, selection: any) => {
      const cursor = selection.getCursor()
      cursor.row += 1
      cursor.column += 1
      this.props.moveCursor(cursor)
    },
    500,
  )

  render () {
    const { outlineElement } = this.props
    return (
      <Panes
        split='vertical'
        primary='second'
        minSize={30}
        defaultSize='70%'
      >
        <Outline {...{ outlineElement }} />
        <AceEditor
          mode='markdown'
          theme='tomorrow'
          keyboardHandler='vim'
          width='100%'
          height='100%'
          value={this.state.body}
          onChange={this.handleChange}
          commands={this.commands}
          ref={(c) => { this.editorComponent = c }}
        />
      </Panes>
    )
  }
}

export default connector(EditorContainer)
