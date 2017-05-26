// @flow
import u from 'unist-builder'
import toHast from 'mdast-util-to-hast'

// raise "Named import from module `unist`. This module has no named export called `Node`."
// $FlowFixMe
import type { Parent, Node } from 'unist'
import type { Marker } from 'mdast-comment-marker'

import type { Options, VFile, Meta, Page } from './types'

export default class NewpageDirectiveVisitor {
  static directiveName = 'newpage'
  static reverse = true
  static defaultOptions = {
    typeName: 'page',
    tagName: 'div',
    withPosition: false,
  }

  constructor (vfile: VFile, { typeName, tagName, withPosition }: Options = {}) {
    this.vfile = vfile
    this.meta = vfile.meta || {}
    const { defaultOptions } = NewpageDirectiveVisitor
    this.typeName = typeName || defaultOptions.typeName
    this.tagName = tagName || defaultOptions.tagName
    this.withPosition = withPosition != null ? withPosition : defaultOptions.withPosition
  }

  vfile: VFile
  meta: Meta
  typeName: string
  tagName: string
  className: string
  withPosition: boolean

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
        [this.buildPage(null, parent.children.slice(0, this.prev.index))],
        parent.children.slice(this.prev.index),
      )
    } else {
      parent.children = [].concat(
        [this.buildPage(null, parent.children)],
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
        [this.buildPage(marker, parent.children.slice(index + 1, this.prev.index))],
        parent.children.slice(this.prev.index),
      )
    } else {
      parent.children = [].concat(
        parent.children.slice(0, index + 1),
        [this.buildPage(marker, parent.children.slice(index + 1))],
      )
    }

    this.prev = { marker, index }
  }

  buildPage (marker: ?Marker, children: Array<Node>): Page {
    const beginAt = marker && marker.node.position.start
    const endAt = this.prev && this.prev.marker.node.position.start
    const position = {
      beginAt: JSON.stringify(beginAt || null),
      endAt: JSON.stringify(endAt || null),
    }
    const data = {
      hName: this.tagName,
      hProperties: Object.assign(
        {},
        this.className ? { className: this.className } : {},
        this.withPosition ? position : {},
      ),
      hChildren: children.map(toHast).filter(n => n != null),
    }
    return u(this.typeName, { data }, children)
  }

  get className (): ?string {
    return this.meta.page && this.meta.page.className
  }
}
