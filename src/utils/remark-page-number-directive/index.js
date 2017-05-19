// @flow
import createPlugin from 'utils/mdast-directive-comment'
import Visitor from './Visitor'
export { default as handlers } from './handlers'
export type { PageNumber } from './types'

const plugin = createPlugin(Visitor)

export default plugin
