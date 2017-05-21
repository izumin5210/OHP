import styled, { css } from 'styled-components'

import { white } from 'settings/colors'
import { spacing } from 'settings/styles'

type Props = {
  screenWidth: number,
  baseFontSize: boolean,
  exporting: boolean,
}

const PageWrapper = styled.section`
  background-color: ${white};
  overflow: hidden;
  page-break-after: always;

  @media not print {
    &:not(:first-child) {
      margin-top: ${2 * spacing}px;
    }
  }

  ${({ screenWidth, baseFontSize, exporting }: Props) => {
    // FIXME
    const actualWidth = 1024
    // FIXME
    const width = exporting ? actualWidth : screenWidth
    // FIXME
    const height = 0.75 * width

    return css`
      width: ${width}px;
      height: ${height}px;
      minHeight: ${height}px;
      maxHeight: ${height}px;
      font-size: ${baseFontSize * (width / actualWidth)}px;
    `
  }}
`

export default PageWrapper
