// @flow
import { PureComponent } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/tomorrow'
import 'brace/keybinding/vim'
import 'brace/keybinding/emacs'

// FIXME
import { defaultBody } from 'settings/constants'

import type { KeyboardHandler, Position } from 'types'
import type Page from 'entities/Page'

import styles from './Editor.css'

type Props = {
  url: string,
  body: string,
  keyboardHandler: KeyboardHandler,
  currentPage: ?Page,
  setBody: (body: string) => void,
  setCursor: (pos: Position) => void,
}

type State = {
  body: string,
  currentPageMarkerId: ?number,
}

export default class Editor extends PureComponent<void, Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      body: props.body,
      currentPageMarkerId: null,
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

  componentWillReceiveProps ({ url, body, currentPage }: Props) {
    if (url !== this.props.url) {
      this.handleChange(body)
    }
    if (currentPage != null && currentPage !== this.props.currentPage) {
      const session = this.editorComponent.editor.getSession()
      const { row: beginRow } = currentPage.beginAt || { row: 1 }
      const endAt = currentPage.endAt || this.endOfFile
      const endRow = endAt.column === 1 ? endAt.row - 1 : endAt.row
      const { id: currentPageMarkerId } = session.highlightLines(
        beginRow - 1,
        endRow - 1,
        `ace_active-line ${styles.currentPageRange}`,
      )
      const { currentPageMarkerId: prevPageMarkerId } = this.state
      this.setState({ currentPageMarkerId }, () => {
        if (prevPageMarkerId != null) {
          session.removeMarker(prevPageMarkerId)
        }
      })
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
        keyboardHandler={this.props.keyboardHandler}
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
