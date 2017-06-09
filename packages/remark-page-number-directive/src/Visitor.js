// @flow
import u from 'unist-builder'
import toHast from 'mdast-util-to-hast'
import defaults from 'defaults'
import cn from 'classnames'
import { DirectiveCommentVisitor } from 'mdast-directive-comment'

import type { Parent } from 'unist'
import type { Marker } from 'mdast-comment-marker'
import type { VFile } from 'vfile'

import type { Props, Options, PageNumber } from './types'

export default class Visitor extends DirectiveCommentVisitor {
  static directiveName = 'pageNumber'
  static typePath = ['page']
  static defaultOptions = {
    typeName: 'pageNumber',
    tagName: 'span',
    pathInFrontmatter: 'pageNumber',
    removeDisabledNumber: false,
    defaultProps: {
      enable: true,
      className: '',
      number: 1,
    }
  }

  constructor (vfile: VFile, options: Options = {}) {
    super(vfile, defaults(options, Visitor.defaultOptions))

    this.defaultProps = defaults(
      typeof this.meta === 'boolean' ? { enable: this.meta } : this.meta,
      this.options.defaultProps,
    )
    this.number = this.defaultProps.number
  }

  number: number
  props: Props
  defaultProps: Props

  beforeVisiting (parent: Parent, depth: number) {
    this.props = { ...this.defaultProps, number: this.number }
  }

  afterVisiting (parent: Parent, depth: number) {
    if (depth === 1) {
      if (!parent.data) {
        parent.data = { hProperties: {} }
      } else if (!parent.data.hProperties) {
        parent.data.hProperties = {}
      }
      if (this.props.enable || !this.options.removeDisabledNumber) {
        const pageNumber = this.buildPageNumber()
        parent.children.push(pageNumber)
        parent.data.hChildren.push(toHast(pageNumber))
      }
      this.number = this.props.number + 1
    }
  }

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
    const { number, enable, className } = marker.parameters

    if (typeof number === 'number') {
      this.props.number = number
    }
    if (typeof enable === 'boolean') {
      this.props.enable = enable
    }
    if (typeof className === 'string') {
      this.props.className = cn(this.props.className, className)
    }
  }

  buildPageNumber (): PageNumber {
    const data = {
      hName: this.options.tagName,
      hProperties: { ...this.props },
    }
    const children = [
      u('text', { value: this.props.number })
    ]
    return u(this.options.typeName, { data }, children)
  }

  get meta (): Props {
    if (this.vfile.meta == null) {
      return {}
    }

    // $FlowFixMe
    const { meta } = this.vfile

    const { pathInFrontmatter } = this.options
    if (typeof pathInFrontmatter === 'string') {
      // $FlowFixMe
      return meta[pathInFrontmatter]
    } else if (Array.isArray(pathInFrontmatter)) {
      return pathInFrontmatter.reduce((obj: Object, path: string) => (obj || {})[path] || {}, meta)
    }

    throw new Error()
  }
}
