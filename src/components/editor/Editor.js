// @flow
import { PureComponent } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/tomorrow'
import 'brace/keybinding/vim'

// FIXME
import { defaultBody } from 'settings/constants'

import type { Position } from 'types'

type Props = {
  url: string,
  body: string,
  setBody: (body: string) => void,
  setCursor: (pos: Position) => void,
}

type State = {
  body: string,
}

export default class Editor extends PureComponent<void, Props, State> {
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
    if (this.state.body.length === 0) {
      editor.setValue(defaultBody)
      editor.clearSelection()
    }
  }

  componentWillReceiveProps ({ url, body }: Props) {
    if (url !== this.props.url) {
      this.handleChange(body)
    }
  }

  get endOfFile (): Position {
    const session = this.editorComponent.editor.getSession()
    const row = session.getLength()
    const column = session.getLine(row).length
    return { row, column }
  }

  get insertNewpageDirectiveCommand (): Object {
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

  get commands (): Array<Object> {
    return [
      this.insertNewpageDirectiveCommand,
    ]
  }

  handleChange = (body: string) => {
    this.setState({ body }, () => this.props.setBody(this.state.body))
  }

  handleCursorChange = (_e: any, selection: any) => {
    const cursor = selection.getCursor()
    cursor.row += 1
    cursor.column += 1
    this.props.setCursor(cursor)
  }

  render () {
    return (
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
    )
  }
}
