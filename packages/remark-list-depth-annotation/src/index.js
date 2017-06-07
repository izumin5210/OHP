// @flow
import visit from 'unist-util-visit'
import visitChildren from 'unist-util-visit-children'

import type { Parent } from 'unist'
import type { List, ListItem } from 'mdast'

export default function () {
  let depth = 0
  const visitItems = visitChildren(visitorListItem)
  return transformer

  function transformer (tree: Parent, f: any) {
    visit(tree, 'list', visitorList)
  }

  function visitorList (node: List): ?boolean {
    depth += 1
    visitItems(node)
    depth -= 1
    return false
  }

  function visitorListItem (node: ListItem): ?boolean {
    if (node.data == null) {
      node.data = { hProperties: { depth } }
    }
    if (node.data.hProperties == null) {
      node.data.hProperties = { depth }
    }
    node.data.hProperties.depth = depth
    visit(node, 'list', visitorList)
  }
}
