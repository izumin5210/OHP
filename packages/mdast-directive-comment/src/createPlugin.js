// @flow
import commentMarker from 'mdast-comment-marker'
import visitNode from 'unist-util-visit'

import type { Parent } from 'unist'
import type { HTML } from 'mdast'
import type { VFile } from 'vfile'

import { isComment } from './utils'
import DirectiveCommentVisitor from './DirectiveCommentVisitor'

export default function createPlugin<O: Object> (Visitor: Class<DirectiveCommentVisitor<O>>) {
  const reverse = Visitor.reverse || false
  const typePath = Visitor.typePath || []

  return plugin

  function plugin (options: O) {
    let visitorInstance

    return transformer

    function transformer (tree: Parent, vfile: VFile) {
      visitorInstance = new Visitor(vfile, options)
      visit(tree, 0)
    }

    function visit (tree: Parent, depth: number) {
      visitorInstance.beforeVisiting(tree, depth)

      if (depth < typePath.length) {
        visitNode(tree, typePath[depth], wrapperVisitor.bind(null, depth + 1), reverse)
      } else {
        visitNode(tree, 'html', commentVisitor, reverse)
      }

      visitorInstance.afterVisiting(tree, depth)
    }

    function wrapperVisitor (depth: number, node: HTML) {
      visit(node, depth)
    }

    function commentVisitor (node: HTML, index: number, parent: ?Parent): ?boolean {
      if (!isComment(node)) {
        return
      }

      const marker = commentMarker(node)

      if (marker != null && marker.name === Visitor.directiveName) {
        return visitorInstance.visit(marker, index, parent)
      }
    }
  }
}
