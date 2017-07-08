import * as ace from 'brace'
import * as React from 'react'

import { EditorProps } from './EditorProps'
import { EditorEventListener, EditorEventName, mapEventNameToCallbackNames } from './EditorEvent'

export type RequiredProps = Partial<EditorProps> & Partial<EditorEventListener> & {
  id?: string,
  value: string,
}

export type DefaultProps = EditorEventListener & {
  id: string,
  commands: EditorProps['commands'],
}

export type Props = RequiredProps & DefaultProps & EditorProps

export interface State {
}

export default class Ace extends React.PureComponent<RequiredProps, State> {
  public static defaultProps: DefaultProps = {
    id: 'ace-multisession',
    commands: [],
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
    const { id, keyboardHandler, mode, theme, value, commands } = this.props as Props
    this.editor = ace.edit(id)
    this.keyboardHandler = keyboardHandler
    this.theme = theme
    this.mode = mode
    this.value = value
    this.commands = commands
    Object.keys(mapEventNameToCallbackNames).forEach((name: EditorEventName) => {
      this.replaceEventListener(name, this.props as Props, {})
    });
  }

  componentWillReceiveProps (nextProps: Readonly<RequiredProps>) {
    const oldProps = this.props as Props
    this.mapPropsToEditor('keyboardHandler', nextProps, oldProps)
    this.mapPropsToEditor('mode',            nextProps, oldProps)
    this.mapPropsToEditor('theme',           nextProps, oldProps)
    this.mapPropsToEditor('value',           nextProps, oldProps)
    this.mapPropsToEditor('commands',        nextProps, oldProps)
    Object.keys(mapEventNameToCallbackNames).forEach((name: EditorEventName) => {
      this.replaceEventListener(name, nextProps as Props, oldProps)
    });
  }

  private mapPropsToEditor (
    key: keyof Props & keyof this,
    nextProps: Readonly<Partial<Props>>,
    oldProps: Readonly<Partial<Props>>,
  ) {
    if (nextProps[key] != oldProps[key]) {
      this[key] = nextProps[key]
    }
  }

  private replaceEventListener (
    name: EditorEventName,
    nextProps: Readonly<EditorEventListener>,
    oldProps: Partial<Readonly<EditorEventListener>> = {},
  ) {
    const key = mapEventNameToCallbackNames[name]
    const oldCb = oldProps[key]
    const nextCb = nextProps[key]
    if (oldCb != nextCb) {
      if (oldCb != null) {
        // FIXME: removeEventListener() and off() have not been defined
        (this.editor as any).off(name, oldCb)
      }
      if (nextCb != null) {
        this.editor.on(name, nextCb)
      }
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

  set commands(commands: ace.EditorCommand[]) {
    this.editor.commands.addCommands(commands)
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
