// @flow
import { PureComponent } from 'react'

type Props = {
  outlineElement: React$Element<*>,
}

export default class Outline extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    const { outlineElement } = this.props
    return (
      <div>
        { outlineElement }
      </div>
    )
  }
}
