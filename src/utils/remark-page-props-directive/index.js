// @flow
import visit from 'unist-util-visit'
import commentMarker from 'mdast-comment-marker'

import type { Parent } from 'unist'
import type { HTML } from 'mdast'

import type { Page } from 'utils/remark-newpage-directive'

function isComment ({ value }: HTML): boolean {
  return value.startsWith('<!--') && value.endsWith('-->')
}

export default function () {
  let page: Page
  return transformer

  function transformer (tree: Parent) {
    visit(tree, 'page', pageVisitor)
  }

  function pageVisitor (node: Page, index: number, parent: ?Parent): ?boolean {
    page = node
    visit(node, 'html', commentVisitor)
  }

  function commentVisitor (node: Page, index: number, parent: ?Parent): ?boolean {
    if (!isComment(node)) {
      return
    }

    const marker = commentMarker(node)

    if (marker != null && marker.name === 'page') {
      const { className } = marker.parameters
      const { className: origin } = page.data.hProperties
      page.data.hProperties.className = `${origin} ${className}`
    }
  }
}
