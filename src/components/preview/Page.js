// @flow
import { PureComponent } from 'react'
import Measure from 'react-measure'
import type { Children } from 'react'

type Props = {
  className: string,
  children?: Children,
}

type State = {
  width: number,
}

/* eslint-disable react/no-unused-prop-types */
type Dimension = {
  width: number,
  height: number,
  top: number,
  right: number,
  bottom: number,
  left: number,
}
/* eslint-enable */

export default class Page extends PureComponent<void, Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      width: 0,
    }
  }

  state: State

  onMeasure = ({ width }: Dimension) => {
    if (this.state.width !== width) {
      this.setState({ width })
    }
  }

  get style (): Object {
    const { width } = this.state
    // TODO: tweak slide acpect ratio
    const height = 0.75 * width
    return {
      height,
      minHeight: height,
      maxHeight: height,
      // TODO: tweak base font-size
      fontSize: 36 * (width / 800)
    }
  }

  render () {
    const { className, children } = this.props
    return (
      <Measure onMeasure={this.onMeasure}>
        <section
          {...{ className }}
          style={this.style}
        >
          { children }
        </section>
      </Measure>
    )
  }
}
