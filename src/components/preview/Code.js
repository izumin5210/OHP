// @flow
import { PureComponent } from 'react'
import Lowlight from 'react-lowlight'

import type { Children } from 'react'
import langMap from 'settings/languageNameMap'

type Props = {
  className:string,
  children: Children,
}

type State = {
  language: string,
}

export default class Code extends PureComponent<void, Props, State> {
  static languageClassNamePattern = /\s*language-([\w-]+)\s*/

  constructor (props: Props) {
    super(props)
    this.state = {
      language: '',
    }
  }

  state: State

  componentWillMount () {
    this.registerLanguage(this.props.className)
  }

  componentWillReceiveProps ({ className }: Props) {
    this.registerLanguage(className)
  }

  async registerLanguage (className: string) {
    const match = (className || '').match(Code.languageClassNamePattern)
    const langName = (match && match[1]) || ''
    const lang = langMap[langName]
    if (lang == null) {
      this.setState({ language: '' })
    } else if (Lowlight.hasLanguage(langName)) {
      this.setState({ language: langName })
    } else {
      Lowlight.registerLanguage(langName, await lang.load())
      this.setState({ language: langName })
    }
  }

  get value (): string {
    return this.props.children[0]
  }

  render () {
    return (
      <Lowlight
        language={this.state.language}
        value={this.value}
        inline
      />
    )
  }
}
