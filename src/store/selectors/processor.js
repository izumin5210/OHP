// @flow
import { createSelector } from 'reselect'
import remark from 'remark'
import remarkRenderer from 'remark-react'
import remarkOutline from 'utils/remark-outline'
import remarkNewpageDirective, {
  handlers as newpageDirectiveHandlers
} from 'utils/remark-newpage-directive'
import githubSanitize from 'hast-util-sanitize/lib/github'
import merge from 'lodash/merge'

import { getBody as getRawBody } from './entities/document'

const sanitize = merge(
  githubSanitize,
  {
    attributes: {
      div: ['className'],
    }
  },
)

const handlers = Object.assign({}, newpageDirectiveHandlers)
const toHast = { handlers }
const rendererOptions = { sanitize, toHast }

const bodyProcessor = remark()
  .use(remarkNewpageDirective)
  .use(remarkRenderer, rendererOptions)
const outlineProcessor = remark().use(remarkOutline).use(remarkRenderer)

export const getBodyAst = createSelector(
  getRawBody,
  (body: string) => bodyProcessor.processSync(body),
)

export const getOutlineAst = createSelector(
  getRawBody,
  (body: string) => outlineProcessor.processSync(body),
)

export const getBodyElement = createSelector(
  getBodyAst,
  ({ contents }: any) => contents,
)

export const getOutlineElement = createSelector(
  getOutlineAst,
  ({ contents }: any) => contents,
)
