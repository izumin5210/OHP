// @flow
import { createSelector } from 'reselect'
import remark from 'remark'
import remarkRenderer from 'remark-react'
import remarkOutline from 'utils/remark-outline'
import remarkNewpageDirective, {
  handlers as newpageDirectiveHandlers
} from 'utils/remark-newpage-directive'
import githubSanitize from 'hast-util-sanitize/lib/github'
import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'
import memoize from 'lodash/memoize'

import { Page } from 'components/preview'

import { getBody as getRawBody } from './entities/document'

const sanitize = mergeWith(
  {},
  githubSanitize,
  {
    tagNames: [
      'page',
    ],
    attributes: {
      page: ['className'],
    }
  },
  (obj, src) => {
    if (isArray(obj) && isArray(src)) {
      return [].concat(obj, src)
    }
  }
)

const handlers = Object.assign({}, newpageDirectiveHandlers)
const toHast = { handlers }
const remarkReactComponents = { page: Page }
const rendererOptions = { sanitize, toHast, remarkReactComponents }

const outlineProcessor = remark().use(remarkOutline).use(remarkRenderer)

type BodyProcessorOptions = {
  pageClassName: string,
}
const getBodyProcessor = ({ pageClassName }: BodyProcessorOptions) => (
  remark()
    .use(remarkNewpageDirective, { tagName: 'page', className: pageClassName })
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
