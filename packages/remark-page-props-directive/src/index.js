// @flow
import { createPlugin } from 'mdast-directive-comment'
import Visitor from './Visitor'

const plugin = createPlugin(Visitor)

export default plugin
