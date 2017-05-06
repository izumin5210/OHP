// @flow
import u from 'unist-builder'
import toHast from 'mdast-util-to-hast'

import type { Parent, Node } from 'unist'
import type { Marker } from 'mdast-comment-marker'

export default class NewpageDirectiveVisitor {
  static directiveName = 'newpage'
  static reverse = true

  prev: {
    marker: Marker,
    index: number,
  }

  beforeVisiting (parent: Parent) {
    // do nothing
  }

  afterVisiting (parent: Parent) {
    if (this.prev != null) {
      parent.children = [].concat(
        [this.buildPage(parent.children.slice(0, this.prev.index))],
        parent.children.slice(this.prev.index),
      )
    }
  }

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
    if (parent == null) {
      return
    }

    if (this.prev != null) {
      parent.children = [].concat(
        parent.children.slice(0, index + 1),
        [this.buildPage(parent.children.slice(index + 1, this.prev.index))],
        parent.children.slice(this.prev.index),
      )
    } else {
      parent.children = [].concat(
        parent.children.slice(0, index + 1),
        [this.buildPage(parent.children.slice(index + 1))],
      )
    }

    this.prev = { marker, index }
  }

  buildPage (children: Array<Node>) {
    const data = {
      hName: 'div',
      hProperties: { className: 'page' },
      hChildren: children.map(toHast),
    }
    return u('page', { data }, children)
  }
}
