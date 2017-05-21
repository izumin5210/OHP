// @flow
import styled, { css } from 'styled-components'

type Props = {
  currentPageRangeClassName: string
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  ${(props: Props) => css`
    .${props.currentPageRangeClassName} {
      opacity: 0.8;
    }
  `}
`

export default Wrapper
