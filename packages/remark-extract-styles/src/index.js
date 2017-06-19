// @flow
import visit from 'unist-util-visit'

import type { Parent } from 'unist'
import type { HTML } from 'mdast'

const STYLE_PATTERN = /^<style.*>([\s\S]*)<\/style>$/

export default function () {
  let vfile
  return transformer

  function transformer (tree: Parent, f: any) {
    vfile = f
    vfile.styles = []
    visit(tree, 'html', visitor, true)
  }

  function visitor (node: HTML, index: number, parent: ?Parent): ?boolean {
    const match = node.value.match(STYLE_PATTERN)
    if (match && match[1] !== null) {
      vfile.styles.unshift(match[1])
      if (parent != null) {
        parent.children.splice(index, 1)
      }
    }
  }
}
