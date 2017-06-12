// @flow
import { DirectiveCommentVisitor } from 'mdast-directive-comment'
import visit from 'unist-util-visit'
import cn from 'classnames/dedupe'

import type { Parent } from 'unist'
import type { Marker } from 'mdast-comment-marker'
import type { VFile } from 'vfile'
import type { Props, PageNumber } from 'remark-insert-page-number'

export default class Visitor extends DirectiveCommentVisitor {
  static directiveName = 'pageNumber'
  static typePath = ['page']

  constructor (vfile: VFile, options: any = {}) {
    super(vfile, options)
    this.props = {}
  }

  props: Props

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
    const { number, enable, className } = marker.parameters
    this.props = { number: this.props.number }

    if (typeof number === 'number') {
      this.props.number = number
    }
    if (typeof enable === 'boolean') {
      this.props.enable = enable
    }
    if (typeof className === 'string') {
      this.props.className = className
    }

    visit(parent, 'pageNumber', this.visitPageNumber)
    this.props.number += 1
  }

  visitPageNumber = (node: PageNumber, index: ?number, parent: ?Parent) => {
    if (this.props.enable == null) {
      this.props.enable = node.data.enable
    }
    if (this.props.number == null) {
      this.props.number = node.data.number
    }
    this.props.className = cn(node.data.className, this.props.className)
    node.data = Object.assign({}, node.data, this.props)
    node.children[0].value = node.data.number
  }
}
