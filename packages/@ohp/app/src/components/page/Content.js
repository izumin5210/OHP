// @flow
import { PureComponent } from 'react'

import type { Children, Element } from 'react'

import highlightDefault from 'styles/vendor/highlight.js/default.css.js'

type Props = {
  className: string,
  userStyles: Array<string>,
  children?: Children,
  style: Object
}

const defaultProps = {
  style: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }
}

export default class Content extends PureComponent<typeof defaultProps, Props, void> {
  static defaultProps = defaultProps

  // for lint
  props: Props

  get userStyles (): Array<Element<*>> {
    return this.props.userStyles.map((style, i) => (
      <style type='text/css' key={`userStyle[${i}]`}>{ style }</style>
    ))
  }

  render () {
    const { className, children, style } = this.props

    return (
      <div {...{ className, style }}>
        { children }
        { this.userStyles }
        <style>
          { highlightDefault }
        </style>
      </div>
    )
  }
}
