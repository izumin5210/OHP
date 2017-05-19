// @flow
import createPlugin from '../mdast-directive-comment'
import NewpageDirectiveVisitor from './NewpageDirectiveVisitor'
export { default as handlers } from './handlers'
export type { Page, Options } from './types'

const plugin = createPlugin(NewpageDirectiveVisitor)

export default plugin
