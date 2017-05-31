// @flow
import createPlugin from 'utils/mdast-directive-comment'
import Visitor from './Visitor'

const plugin = createPlugin(Visitor)

export default plugin
