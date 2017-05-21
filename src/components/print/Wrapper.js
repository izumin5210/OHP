// @flow
import styled from 'styled-components'

const Wrapper = styled.div`
  @media not print {
    visibility: hidden;
    overflow: hidden;
    height: 0;
  }
`

export default Wrapper
