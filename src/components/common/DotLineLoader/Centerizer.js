// @flow
import styled, { css } from 'styled-components'

type Props = {
  fillParent: boolean,
}

const Centerizer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ fillParent }: Props) => fillParent ? css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  ` : css``}
`

export default Centerizer
