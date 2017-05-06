// @flow
import createPlugin from '../mdast-directive-comment'
import NewpageDirectiveVisitor from './NewpageDirectiveVisitor'
export { default as handlers } from './handlers'

const plugin = createPlugin(NewpageDirectiveVisitor)

export default plugin
