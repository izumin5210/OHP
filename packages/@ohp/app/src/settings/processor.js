// @flow
import Page, { PageNumber, CodeBlock, Image } from 'components/page'
import { Link, List, ListItem } from 'components/outline'

export const components = {
  page: Page,
  pageNumber: PageNumber,
  pre: CodeBlock,
  img: Image,
}

export const outlineComponents = {
  a: Link,
  ul: List,
  li: ListItem,
}
