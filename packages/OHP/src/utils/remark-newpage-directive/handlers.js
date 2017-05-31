// @flow
import all from 'mdast-util-to-hast/lib/all'

const handlers = {
  page: function page (h: any, node: any) {
    return h(node, 'page', all(h, node))
  }
}

export default handlers
