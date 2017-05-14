// @flow
import { PureComponent } from 'react'
import Lowlight from 'react-lowlight'
import js from 'highlight.js/lib/languages/javascript'

import type { Children } from 'react'

type Props = {
  className:string,
  children: Children,
}

Lowlight.registerLanguage('js', js)

export default class Code extends PureComponent<void, Props, void> {
  static languageClassNamePattern = /\s*language-([\w-]+)\s*/

  // for lint
  props: Props

  get language (): string {
    const match = (this.props.className || '').match(Code.languageClassNamePattern)
    const lang = (match && match[1]) || ''
    return Lowlight.hasLanguage(lang) ? lang : ''
  }

  get value (): string {
    return this.props.children[0]
  }

  render () {
    return (
      <Lowlight
        language={this.language}
        value={this.value}
        inline
      />
    )
  }
}
