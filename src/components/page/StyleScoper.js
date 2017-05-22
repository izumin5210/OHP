// @flow
import { PureComponent } from 'react'
import ShadowDom from 'react-shadow'

import type { Children } from 'react'

type Props = {
  children?: Children,
  style: Object,
}

const defaultProps = {
  style: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
}

export default class StyleScoper extends PureComponent<typeof defaultProps, Props, void> {
  static defaultProps = defaultProps

  // for lint
  props: Props

  render () {
    const { children, style } = this.props

    return (
      <ShadowDom nodeName='div'>
        <div style={style}>
          { children }
        </div>
      </ShadowDom>
    )
  }
}
