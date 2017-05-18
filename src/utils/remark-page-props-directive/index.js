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
  let num: number
  // TODO: typing
  let meta: any
  let numberEnabled: boolean
  let numberEnabledInDefault: boolean

  return transformer

  function transformer (tree: Parent, vfile: any) {
    meta = vfile.meta
    numberEnabledInDefault = !!(meta && meta.pageNumber)
    num = typeof (meta && meta.pageNumber) === 'number' ? meta.pageNumber : 1
    visit(tree, 'page', pageVisitor)
  }

  function pageVisitor (node: Page, index: number, parent: ?Parent): ?boolean {
    page = node
    numberEnabled = numberEnabledInDefault
    visit(node, 'html', commentVisitor)
    if (numberEnabled) {
      page.data.hProperties.number = num
    }
    num += 1
  }

  function commentVisitor (node: Page, index: number, parent: ?Parent): ?boolean {
    if (!isComment(node)) {
      return
    }

    const marker = commentMarker(node)

    if (marker != null && marker.name === 'page') {
      const { className, pageNumber } = marker.parameters

      // className
      if (className != null) {
        const { className: origin } = page.data.hProperties
        page.data.hProperties.className = `${origin} ${className}`
      }

      // pageNumber
      if (typeof pageNumber === 'number') {
        num = pageNumber
      }
      if (pageNumber != null) {
        numberEnabled = pageNumber !== false
      }
    }
  }
}
