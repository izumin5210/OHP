// @flow
import visit from 'unist-util-visit'
import visitChildren from 'unist-util-visit-children'

import type { Node, Parent } from 'unist'
import type { List, ListItem } from 'mdast'

export type Options = {
  target?: string,
}

export default function ({ target }: Options) {
  let depth = 0
  const visitItems = visitChildren(visitorListItem)
  const visitTarget = visitChildren(visitorTarget)
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
    if (target == null) {
      annotate(node)
    } else {
      visitTarget(node)
    }
    visit(node, 'list', visitorList)
  }

  function visitorTarget (node: Node): ?boolean {
    if (node.type !== 'list') {
      if (node.type === target) {
        annotate(node)
      } else {
        visitTarget(node)
      }
    }
  }

  function annotate (node: Node) {
    if (node.data == null) {
      node.data = { hProperties: { depth } }
    }
    if (node.data.hProperties == null) {
      node.data.hProperties = { depth }
    }
    node.data.hProperties.depth = depth
  }
}
