// @flow
import styled from 'styled-components'
import * as colors from 'settings/colors'

const Wrapper = styled.nav`
  min-height: 100%;
  background-color: ${colors.blackForeground700};
  overflow: hidden;

  > div {
    min-height: 100%;
  }
`

export default Wrapper
