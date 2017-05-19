// @flow
import type { Parent } from 'unist'
import type { Marker } from 'mdast-comment-marker'

export default class Visitor {
  static directiveName = 'page'
  static typePath = ['page']

  page: Parent

  beforeVisiting (parent: Parent, depth: number) {
    // do nothing
  }

  afterVisiting (parent: Parent) {
    // do nothing
  }

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
    const { className } = marker.parameters

    if (parent != null && className != null) {
      if (!parent.data) {
        parent.data = { hProperties: {} }
      } else if (!parent.data.hProperties) {
        parent.data.hProperties = {}
      }
      const { className: origin } = parent.data.hProperties
      parent.data.hProperties.className = `${origin || ''} ${className}`
    }
  }
}
