// @flow
import styled, { css, keyframes } from 'styled-components'
import * as colors from 'settings/colors'
import { spacing } from 'settings/styles'

type CircleProps = {
  size: number,
  number: number,
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

const Circle = styled.span`
  display: inline-block;
  margin: 0 ${spacing}px;

  ${({ size, number }: CircleProps) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size / 2}px;
    /* ease-in-back: https://github.com/thoughtbot/bourbon/blob/71ccaee5d642dcbd930a3c550a4f48a83d15b98b/core/bourbon/library/_timing-functions.scss#L20 */
    animation: ${scaleAnim} 1s ${0.1 * number}s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
  `}
`

type Props = {
  fillParent: boolean,
}

const Wrapper = styled.div`
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

const circles = Array.from(Array(5).keys()).map(i => (<Circle size={12} number={i + 1} />))

export default function CirclesLoader (props: Props) {
  return (
    <Wrapper {...props}>
      { circles }
    </Wrapper>
  )
}
