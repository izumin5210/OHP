// @flow
import u from 'unist-builder'
import toHast from 'mdast-util-to-hast'

import type { Parent } from 'unist'
import type { Marker } from 'mdast-comment-marker'

import type { PageNumber } from './types'
type Props = {
  enable: boolean,
  className: string,
}

export default class Visitor {
  static directiveName = 'pageNumber'
  static typePath = ['page']

  constructor (vfile: any) {
    this.number = 1
    this.defaultProps = {
      enable: false,
      className: '',
    }

    const meta = (vfile.meta && vfile.meta.pageNumber) || {}
    if (typeof meta === 'boolean') {
      this.defaultProps.enable = meta
    } else {
      this.number = meta.number || this.number
      this.defaultProps.enable = (meta.enable != null ? meta : this.defaultProps).enable
      this.defaultProps.className = meta.className || this.defaultProps.className
    }
  }

  number: number
  props: Props
  defaultProps: Props

  beforeVisiting (parent: Parent, depth: number) {
    this.props = Object.assign({}, this.defaultProps)
  }

  afterVisiting (parent: Parent, depth: number) {
    if (depth === 1) {
      if (!parent.data) {
        parent.data = { hProperties: {} }
      } else if (!parent.data.hProperties) {
        parent.data.hProperties = {}
      }
      const pageNumber = this.buildPageNumber()
      parent.children.push(pageNumber)
      parent.data.hChildren.push(toHast(pageNumber))
      this.number += 1
    }
  }

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
    const { number, enable, className } = marker.parameters

    if (typeof number === 'number') {
      this.number = number
    }
    if (typeof enable === 'boolean') {
      this.props.enable = enable
    }
    if (typeof className === 'string') {
      this.props.className = className
    }
  }

  buildPageNumber (): PageNumber {
    const data = {
      hName: 'pageNumber',
      hProperties: Object.assign(
        {},
        this.props,
      ),
    }
    const children = [
      u('text', { value: this.number })
    ]
    return u('pageNumber', { data }, children)
  }
}
