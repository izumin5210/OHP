// @flow
import styled from 'styled-components'

import { blackForeground800 } from 'settings/colors'
import { spacing } from 'settings/styles'

const SlideWrapper = styled.article`
  background-color: ${blackForeground800};
  min-height: calc(100% - ${4 * spacing}px);
  padding: ${2 * spacing}px;

  .test {
    padding-top: 100000px;
  }
`

export default SlideWrapper
