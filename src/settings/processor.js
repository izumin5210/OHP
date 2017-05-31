// @flow
import githubSanitize from 'hast-util-sanitize/lib/github'
import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

import { handlers as pageHandlers } from 'utils/remark-newpage-directive'
import { handlers as pageNumberHandlers } from 'utils/remark-page-number-directive'

import Page, { PageNumber, CodeBlock, Image } from 'components/page'
import { Link, List, ListItem } from 'components/outline'

export const sanitize = mergeWith(
  {},
  githubSanitize,
  {
    tagNames: [
      'page',
      'pageNumber',
    ],
    attributes: {
      '*': ['className'],
      'page': ['beginAt', 'endAt', 'pageNumber'],
      'pageNumber': ['enable'],
      'a': ['depth'],
    }
  },
  (obj, src) => {
    if (isArray(obj) && isArray(src)) {
      return [].concat(obj, src)
    }
  }
)

export const handlers = Object.assign(
  {},
  pageHandlers,
  pageNumberHandlers,
)

export const components = {
  page: Page,
  pageNumber: PageNumber,
  pre: CodeBlock,
  img: Image,
}

export const newpage = {
  tagName: 'page',
  withPosition: true,
}

export const outlineComponents = {
  a: Link,
  ul: List,
  li: ListItem,
}
