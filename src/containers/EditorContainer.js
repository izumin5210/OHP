// @flow
import { PureComponent } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/tomorrow'
import 'brace/keybinding/vim'

type Props = {
  body: string,
  onBodyChange: (body: string) => void,
}

export default class EditorContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    const { body, onBodyChange } = this.props
    return (
      <AceEditor
        mode='markdown'
        theme='tomorrow'
        keyboardHandler='vim'
        width='100%'
        height='100%'
        value={body}
        onChange={onBodyChange}
      />
    )
  }
}
