// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import type { Connector } from 'react-redux'

import { getWidth } from 'store/selectors/preview'
import type { RootState } from 'store/modules'

type RequiredProps = {
  src: string,
  alt: string,
}

type InjectedProps = {
  // To emit update when page width changed
  pageWidth: number
}

type Props = RequiredProps & InjectedProps

type State = {
  originalWidth: number,
  originalHeight: number,
  width: number,
  height: number,
  loaded: bool,
}

const connector: Connector<RequiredProps, Props> = connect(
  (state: RootState) => ({
    pageWidth: getWidth(state),
  }),
)

class AdjustableImage extends PureComponent<void, Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      originalWidth: 0,
      originalHeight: 0,
      loaded: false,
    }
  }

  // for typecheck
  state: State
  image: Image

  componentWillReceiveProps ({ pageWidth }: Props) {
    if (this.state.loaded) {
      this.adjustImageSize(pageWidth)
    }
  }

  get size (): { width?: number, height?: number } {
    const { width, height, loaded } = this.state
    return loaded ? { width, height } : {}
  }

  onLoad = (_e: any) => {
    const { width, height } = this.image
    const newState = {
      originalWidth: width,
      originalHeight: height,
      width,
      height,
      loaded: true,
    }
    this.setState(newState, () => { this.adjustImageSize() })
  }

  adjustImageSize (pageWidth = this.props.pageWidth) {
    if (!this.state.loaded) {
      return
    }

    let { originalWidth: width, originalHeight: height } = this.state
    // FIXME
    const r1 = pageWidth / 1024
    width *= r1
    height *= r1

    this.setState({ width, height })
  }

  render () {
    const { src, alt } = this.props
    return (
      <img
        alt={alt}
        ref={() => {
          if (this.image == null) {
            this.image = new Image()
            this.image.onload = this.onLoad
            this.image.src = src
          }
        }}
        {...{ src, ...this.size }}
      />
    )
  }
}

export default connector(AdjustableImage)
