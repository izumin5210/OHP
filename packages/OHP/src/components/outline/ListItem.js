// @flow
import styled from 'styled-components'

const height = 42

const ListItem = styled.li`
  min-height: ${height}px;
  line-height: ${height}px;

  & > p {
    margin: 0;
    padding: 0;
  }
`

export default ListItem
