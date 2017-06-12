// @flow
import { createPlugin } from 'mdast-directive-comment'
import Visitor from './Visitor'

export { default as createHandler } from './createHandler'
export type { Page, Options } from './types'

const plugin = createPlugin(Visitor)

export default plugin
