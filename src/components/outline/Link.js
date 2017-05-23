// @flow
import styled, { css } from 'styled-components'

import * as vars from 'settings/styles'
import * as colors from 'settings/colors'

type Props = {
  depth: '1' | '2' | '3' | '4' | '5' | '6',
}

const fn = ({ depth: depthStr }: Props) => {
  const depth = parseInt(depthStr)

  return css`
    padding-left: ${(2 + (depth > 1 ? depth - 2 : 0)) * vars.spacing}px;

    &:before {
      content: '${'#'.repeat(depth)}';
    }
  `
}

const Link = styled.a`
  display: block;
  height: 100%;
  padding-right: ${2 * vars.spacing}px;
  border-bottom: 1px solid ${colors.blackForeground200};
  text-decoration: none;
  font-size: 0.9rem;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${fn}

  &:before {
    color: ${colors.whiteForeground300};
    padding-right: ${vars.spacing}px;
    font-size: 0.8rem;
  }

  &:hover {
    background-color: ${colors.blackForeground200};
  }
`

export default Link
