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
    assert(node.type === 'list')
    depth += 1
    visitItems(node)
    depth -= 1
    return false
  }

  function visitorListItem (node: ListItem): ?boolean {
    assert(node.type === 'listItem')
    const link = node.children[0].children[0]
    assert(link.type === 'link')
    if (link.data == null) {
      link.data = { hProperties: { depth } }
    }
    if (link.data.hProperties == null) {
      link.data.hProperties = { depth }
    }
    link.data.hProperties.depth = depth
    visit(node, 'list', visitorList)
  }
}
