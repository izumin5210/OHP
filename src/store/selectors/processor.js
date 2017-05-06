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
import memoize from 'lodash/memoize'

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

const outlineProcessor = remark().use(remarkOutline).use(remarkRenderer)

type BodyProcessorOptions = {
  pageClassName: string,
}
const getBodyProcessor = ({ pageClassName }: BodyProcessorOptions) => (
  remark()
    .use(remarkNewpageDirective, { className: pageClassName })
    .use(remarkRenderer, rendererOptions)
)

export const getBodyAstRenderer = createSelector(
  getRawBody,
  (body: string) => memoize((opts: BodyProcessorOptions) => (
    getBodyProcessor(opts).processSync(body)
  )),
)

export const getOutlineAst = createSelector(
  getRawBody,
  (body: string) => outlineProcessor.processSync(body),
)

export const getBodyElementRenderer = createSelector(
  getBodyAstRenderer,
  (getBodyAst: (opts: BodyProcessorOptions) => any) => (
    memoize((opts: BodyProcessorOptions) => getBodyAst(opts).contents
  )),
)

export const getOutlineElement = createSelector(
  getOutlineAst,
  ({ contents }: any) => contents,
)
