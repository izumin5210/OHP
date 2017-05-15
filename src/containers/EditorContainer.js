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

import * as DocumentActions from 'store/modules/entities/document'
import * as EditorActions from 'store/modules/editorState'
import { getBody } from 'store/selectors/entities/document'
import { getOutlineAst } from 'store/selectors/processor'
import Panes from 'components/common/Panes'
import { Outline } from 'components/editor'

import type { RootState } from 'store/modules'
import type { Position } from 'store/modules/editorState'

type RequiredProps = {
}

type InjectedProps = {
  body: string,
  outlineElement: React$Element<*>,
  setBody: (body: string) => any,
  moveCursor: (pos: Position) => any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    body: getBody(state),
    outlineElement: getOutlineAst(state).contents,
  }),
  (dispatch: Dispatch<Action<any, any>>) => ({
    setBody: debounce(
      (body: string) => dispatch(DocumentActions.setBody(body)),
      100,
      { maxWait: 500 },
    ),
    moveCursor: debounce(
      (pos: Position) => dispatch(EditorActions.moveCursor(pos)),
      100,
      { maxWait: 500 },
    ),
  }),
)

class EditorContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props
  editorComponent: AceEditor

  componentDidMount () {
    const session = this.editorComponent.editor.getSession()
    session.getSelection().on('changeCursor', (_e: any, selection: any) => {
      this.props.moveCursor(selection.getCursor())
    })
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

  render () {
    const { body, outlineElement, setBody } = this.props
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
          value={body}
          onChange={setBody}
          commands={this.commands}
          ref={(c) => { this.editorComponent = c }}
        />
      </Panes>
    )
  }
}

export default connector(EditorContainer)
