// @flow
import all from 'mdast-util-to-hast/lib/all'

const createHandler = (typeName: string) => (
  function page (h: any, node: any) {
    return h(node, typeName, node.data, all(h, node))
  }
)

export default createHandler
