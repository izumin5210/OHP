// @flow
import { createPlugin } from 'mdast-directive-comment'
import Visitor from './Visitor'

export { default as handlers } from './handlers'
export type { PageNumber, Options } from './types'

const plugin = createPlugin(Visitor)

export default plugin
