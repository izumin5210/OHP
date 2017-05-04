// @flow
import { PureComponent } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/tomorrow'
import 'brace/keybinding/vim'

type Props = {
}

type State = {
  body: string,
}

export default class EditorContainer extends PureComponent<void, Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      body: '',
    }
  }

  state: State

  render () {
    return (
      <AceEditor
        mode='markdown'
        theme='tomorrow'
        keyboardHandler='vim'
        width='100%'
        height='100%'
        value={this.state.body}
        onChange={v => this.setState({ body: v })}
      />
    )
  }
}
