// @flow
import all from 'mdast-util-to-hast/lib/all'

const handlers = {
  pageNumber: function pageNumber (h: any, node: any) {
    return h(node, 'pageNumber', all(h, node))
  }
}

export default handlers
