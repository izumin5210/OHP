// @flow
import { PureComponent } from 'react'
import Centerizer from './Centerizer'
import Dot from './Dot'

const circles = Array.from(Array(5).keys()).map(i => (<Dot size={12} key={i} index={i} />))

type Props = {
  fillParent: bool,
}

const defaultProps = {
  fillParent: false,
}

export default class Loader extends PureComponent<typeof defaultProps, Props, void> {
  static defaultProps = defaultProps

  // for lint
  props: Props

  render() {
    return (
      <Centerizer {...props}>
        {circles}
      </Centerizer>
    )
  }
