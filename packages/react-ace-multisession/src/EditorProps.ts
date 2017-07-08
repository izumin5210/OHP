import * as ace from 'brace'

export interface EditorProps {
  keyboardHandler: string,
  mode: string,
  theme: string,
  value: string,
  commands: ace.EditorCommand[],
}
