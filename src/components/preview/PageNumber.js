// @flow
import { PureComponent } from 'react'
import type { Element } from 'react'

type Props = {
  enable: boolean,
  className: string,
  children: Element<*>,
}

export default class PageNumber extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    const { children, enable, className } = this.props

    if (enable) {
      return (
        <div {...{ className }}>{ children }</div>
      )
    }

    return null
  }
}
