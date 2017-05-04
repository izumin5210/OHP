// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/tomorrow'
import 'brace/keybinding/vim'

import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'

import * as Actions from 'store/modules/entities/document'
import { getBody } from 'store/selectors/entities/document'

import type { RootState } from 'store/modules'

type RequiredProps = {
}

type InjectedProps = {
  body: string,
  setBody: (body: string) => any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    body: getBody(state),
  }),
  (dispatch: Dispatch<Action<*, *>>) => ({
    setBody: (body: string) => dispatch(Actions.setBody(body))
  }),
)

class EditorContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    console.log(Actions)
    const { body, setBody } = this.props
    return (
      <AceEditor
        mode='markdown'
        theme='tomorrow'
        keyboardHandler='vim'
        width='100%'
        height='100%'
        value={body}
        onChange={setBody}
      />
    )
  }
}

export default connector(EditorContainer)
