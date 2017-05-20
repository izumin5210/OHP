// @flow
import githubSanitize from 'hast-util-sanitize/lib/github'
import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

import { handlers as pageHandlers } from 'utils/remark-newpage-directive'
import { handlers as pageNumberHandlers } from 'utils/remark-page-number-directive'

import SlideContainer from 'containers/SlideContainer'
import { PageNumber, CodeBlock } from 'components/preview'

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
  page: SlideContainer,
  pageNumber: PageNumber,
  pre: CodeBlock,
}

export const newpage = {
  tagName: 'page',
  withPosition: true,
}
