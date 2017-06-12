// @flow
import u from 'unist-builder'
import defaults from 'defaults'
import { DirectiveCommentVisitor } from 'mdast-directive-comment'
import cn from 'classnames/dedupe'

import type { Parent, Node } from 'unist'
import type { Marker } from 'mdast-comment-marker'
import type { VFile } from 'vfile'

import getPropsFromFrontmatter from './getPropsFromFrontmatter'
import type { Options, Page } from './types'

export default class NewpageDirectiveVisitor extends DirectiveCommentVisitor {
  static directiveName = 'newpage'
  static reverse = true
  static defaultOptions = {
    typeName: 'page',
    pathInFrontmatter: 'page',
    withPosition: false,
  }

  constructor (vfile: VFile, options: Options = {}) {
    super(vfile, defaults(options, NewpageDirectiveVisitor.defaultOptions))
    this.props = getPropsFromFrontmatter(vfile, this.options.pathInFrontmatter)
  }

  prev: {
    marker: Marker,
    index: number,
  }
  props: any

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
    const data = this.buildProps(marker)
    return u(this.options.typeName, { data }, children)
  }

  buildProps (marker: ?Marker): Object {
    return {
      className: cn(this.props.className, this.options.className),
      ...(this.options.withPosition ? this.buildPosition(marker) : {}),
    }
  }

  buildPosition (marker: ?Marker): {
    beginLineAt?: number,
    beginColumnAt?: number,
    endLineAt?: number,
    endColumnAt?: number,
  } {
    const beginAt = marker && marker.node.position.start
    const endAt = this.prev && this.prev.marker.node.position.start
    return Object.assign(
      {},
      beginAt != null ? { beginLineAt: beginAt.line, beginColumnAt: beginAt.column } : {},
      endAt != null ? { endLineAt: endAt.line, endColumnAt: endAt.column } : {},
    )
  }
}
