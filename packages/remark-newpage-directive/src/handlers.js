// @flow
import all from 'mdast-util-to-hast/lib/all'

const createHandlers = (typeName: string) => ({
  page: function page (h: any, node: any) {
    return h(node, typeName, all(h, node))
  }
})

export default createHandlers
