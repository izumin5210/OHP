// @flow
import u from 'unist-builder'
import toHast from 'mdast-util-to-hast'

import type { Parent, Node } from 'unist'
import type { Marker } from 'mdast-comment-marker'

type Options = {
  typeName?: string,
  tagName?: string,
  className?: string,
}

export default class NewpageDirectiveVisitor {
  static directiveName = 'newpage'
  static reverse = true
  static defaultOptions = {
    typeName: 'page',
    tagName: 'div',
    className: 'page',
  }

  constructor ({ typeName, tagName, className }: Options = {}) {
    const { defaultOptions } = NewpageDirectiveVisitor
    this.typeName = typeName || defaultOptions.typeName
    this.tagName = tagName || defaultOptions.tagName
    this.className = className || defaultOptions.className
  }

  typeName: string
  tagName: string
  className: string

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
    } else {
      parent.children = [].concat(
        [this.buildPage(parent.children)],
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
      hName: this.tagName,
      hProperties: { className: this.className },
      hChildren: children.map(toHast).filter(n => n != null),
    }
    return u(this.typeName, { data }, children)
  }
}
