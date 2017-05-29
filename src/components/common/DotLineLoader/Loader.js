// @flow
import Centerizer from './Centerizer'
import Dot from './Dot'

const circles = Array.from(Array(5).keys()).map(i => (<Dot size={12} key={i} index={i} />))

type Props = {
  fillParent: bool,
}

export default function Loader (props: Props) {
  return (
    <Centerizer {...props}>
      { circles }
    </Centerizer>
  )
}
