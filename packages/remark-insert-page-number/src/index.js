// @flow
import u from 'unist-builder'
import visit from 'unist-util-visit'
import toHast from 'mdast-util-to-hast'
import defaults from 'defaults'
import cn from 'classnames/dedupe'

import type { Parent } from 'unist'
import type { VFile } from 'vfile'
import type { Page } from 'remark-newpage-directive'

import getPropsFromFrontmatter from './getPropsFromFrontmatter'
import type { Options, PageNumber } from './types'

export default function (args: Options = {}) {
  let props, options

  const defaultOptions = {
    typeName: 'pageNumber',
    tagName: 'span',
    pathInFrontmatter: 'pageNumber',
    defaultProps: {
      enable: true,
      className: '',
      number: 1,
    },
  }

  return transformer

  function transformer (tree: Parent, vfile: VFile) {
    options = defaults(args, defaultOptions)
    const frontmatter = getPropsFromFrontmatter(vfile, options.pathInFrontmatter)
    props = defaults(
      typeof frontmatter === 'boolean' ? { enable: frontmatter } : frontmatter,
      options.defaultProps,
    )

    props.className = cn(props.className, options.defaultProps.className)

    visit(tree, 'page', visitor)
  }

  function visitor (node: Page, index: ?number, parent: ?Parent): ?boolean {
    const pageNumber = buildPageNumber()
    node.children.push(pageNumber)
    node.data.hChildren.push(toHast(pageNumber))
    props.number += 1
  }

  function buildPageNumber (): PageNumber {
    const data = {
      hName: options.tagName,
      hProperties: { ...props },
    }
    const children = [
      u('text', { value: props.number })
    ]
    return u(options.typeName, { data }, children)
  }
}
