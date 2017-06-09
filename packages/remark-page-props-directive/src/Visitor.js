// @flow
import cn from 'classnames'
import { DirectiveCommentVisitor } from 'mdast-directive-comment'

import type { Parent } from 'unist'
import type { Marker } from 'mdast-comment-marker'

export default class Visitor extends DirectiveCommentVisitor {
  static directiveName = 'page'
  static typePath = ['page']

  page: Parent

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
    if (parent == null) {
      return
    }

    if (!parent.data) {
      parent.data = { hProperties: {} }
    } else if (!parent.data.hProperties) {
      parent.data.hProperties = {}
    }

    parent.data.hProperties.className = cn(
      marker.parameters.className,
      parent.data.hProperties.className,
    )
  }
}
