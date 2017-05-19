// @flow
import type { Parent } from 'unist'
import type { Marker } from 'mdast-comment-marker'

export default class Visitor {
  static directiveName = 'pageNumber'
  static typePath = ['page']

  constructor (vfile: any) {
    const meta = vfile.meta
    this.numberEnabledInDefault = !!(meta && meta.pageNumber)
    this.numberEnabled = this.numberEnabledInDefault
    this.number = typeof (meta && meta.pageNumber) === 'number' ? meta.pageNumber : 1
  }

  number: number
  numberEnabledInDefault: boolean
  numberEnabled: boolean

  beforeVisiting (parent: Parent, depth: number) {
    // do nothing
  }

  afterVisiting (parent: Parent, depth: number) {
    if (depth === 1) {
      if (parent != null && this.numberEnabled) {
        if (!parent.data) {
          parent.data = { hProperties: {} }
        } else if (!parent.data.hProperties) {
          parent.data.hProperties = {}
        }
        parent.data.hProperties.number = this.number
      }
      this.numberEnabled = this.numberEnabledInDefault
      this.number += 1
    }
  }

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
    const { number } = marker.parameters

    if (typeof number === 'number') {
      this.number = number
    }

    this.numberEnabled = number != null ? number !== false : this.numberEnabledInDefault
  }
}
