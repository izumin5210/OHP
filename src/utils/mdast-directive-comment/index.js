// @flow
import commentMarker from 'mdast-comment-marker'
import visit from 'unist-util-visit'

import type { Parent } from 'unist'
import type { HTML } from 'mdast'
import type { Marker } from 'mdast-comment-marker'

export interface DirectiveCommentVisitor {
  static directiveName: string,
  static reverse: boolean,
  beforeVisiting(parent: Parent): void,
  afterVisiting(parent: Parent): void,
  visit(marker: Marker, index: number, parent: ?Parent): ?boolean,
}

function isComment ({ value }: HTML): boolean {
  return value.startsWith('<!--') && value.endsWith('-->')
}

export default function createPlugin (Visitor: Class<DirectiveCommentVisitor>) {
  return plugin

  function plugin () {
    let visitorInstance

    return transformer

    function transformer (tree: Parent) {
      visitorInstance = new Visitor()
      visitorInstance.beforeVisiting(tree)
      visit(tree, 'html', visitor, Visitor.reverse || false)
      visitorInstance.afterVisiting(tree)
    }

    function visitor (node: HTML, index: number, parent: ?Parent): ?boolean {
      if (!isComment(node)) {
        return
      }

      const marker = commentMarker(node)

      if (marker.name === Visitor.directiveName) {
        return visitorInstance.visit(marker, index, parent)
      }
    }
  }
}
