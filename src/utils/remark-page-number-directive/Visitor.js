// @flow
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
      parent.data.hProperties.pageNumber = JSON.stringify(this.buildPageNumberObject())
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

  buildPageNumberObject (): PageNumber {
    return Object.assign({}, this.props, { number: this.number })
  }
}
