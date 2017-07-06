import * as ace from 'brace'
import * as React from 'react'

export interface RequiredProps {
  id?: string,
  keyboardHandler?: string,
  mode?: string,
  theme?: string,
  value: string,
  onBlur?: () => void,
  onChange?: (e: ace.EditorChangeEvent) => void,
  onChangeSelectionStyle?: (e: Object) => void,
  onChangeSession?: (e: Object) => void,
  onCopy?: (text: String) => void,
  onFocus?: () => void,
  onPaste?: (e: Object) => void,
}

export interface DefaultProps extends Partial<RequiredProps> {
  id: string,
  onBlur: () => void,
  onChange: (e: ace.EditorChangeEvent) => void,
  onChangeSelectionStyle: (e: Object) => void,
  onChangeSession: (e: Object) => void,
  onCopy: (text: String) => void,
  onFocus: () => void,
  onPaste: (e: Object) => void,
}

type Props = RequiredProps & DefaultProps

export interface State {
}

export default class Ace extends React.PureComponent<RequiredProps, State> {
  public static defaultProps: DefaultProps = {
    id: 'ace-multisession',
    onBlur: () => {},
    onChange: () => {},
    onChangeSelectionStyle: () => {},
    onChangeSession: () => {},
    onCopy: () => {},
    onFocus: () => {},
    onPaste: () => {},
  }

  editor: ace.Editor
  editorRef: HTMLElement

  componentDidMount () {
    const { id, keyboardHandler, mode, theme, value } = this.props as Props
    this.editor = ace.edit(id)
    this.keyboardHandler = keyboardHandler
    this.theme = theme
    this.mode = mode
    this.value = value
  }

  componentWillReceiveProps (nextProps: Readonly<RequiredProps>) {
    const oldProps = this.props as Props
    this.mapPropsToEditor('keyboardHandler', nextProps, oldProps)
    this.mapPropsToEditor('mode',            nextProps, oldProps)
    this.mapPropsToEditor('theme',           nextProps, oldProps)
    this.mapPropsToEditor('value',           nextProps, oldProps)
  }

  private mapPropsToEditor (
    key: keyof Props & keyof this,
    nextProps: Readonly<RequiredProps>,
    oldProps: Readonly<RequiredProps>,
  ) {
    if (nextProps[key] != oldProps[key]) {
      this[key] = nextProps[key]
    }
  }

  set keyboardHandler (handler: string | undefined) {
    this.editor.setKeyboardHandler(handler != null ? `ace/keyboard/${handler}` : '')
  }

  set mode (mode: string | undefined) {
    this.editor.getSession().setMode(`ace/mode/${mode}`)
  }

  set theme (theme: string | undefined) {
    this.editor.setTheme(`ace/theme/${theme}`)
  }

  set value (value: string) {
    this.editor.setValue(value)
  }

  render () {
    const { id } = this.props
    return (
      <div
        id={id}
        ref={(ref: HTMLDivElement) => { this.editorRef = ref }}
      />
    )
  }
}
