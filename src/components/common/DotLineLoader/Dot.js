// @flow
import styled, { css, keyframes } from 'styled-components'
import * as colors from 'settings/colors'
import { spacing } from 'settings/styles'

type Props = {
  size: number,
  index: number,
}

// ref: https://codepen.io/JesGraPa/pen/Hyaiw
const scaleAnim = keyframes`
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(0.9, 0.9);
    background: ${colors.accent.purple};
  }
  50% {
    transform: scale(1, 1);
    background: ${colors.accent.pink};
  }
  100% {
    transform: scale(0);
  }
`

const Dot = styled.span`
  display: inline-block;
  margin: 0 ${spacing}px;
  /* ease-in-back: https://github.com/thoughtbot/bourbon/blob/71ccaee5d642dcbd930a3c550a4f48a83d15b98b/core/bourbon/library/_timing-functions.scss#L20 */
  animation: ${scaleAnim} 1s  infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);

  ${({ size, index }: Props) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size / 2}px;
    animation-delay: ${0.1 * index}s;
  `}
`

export default Dot
