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
    visit(tree, 'html', visitor)
  }

  function visitor (node: HTML): ?boolean {
    const match = node.value.match(STYLE_PATTERN)
    if (match && match[1] !== null) {
      vfile.styles.push(match[1])
    }
  }
}
