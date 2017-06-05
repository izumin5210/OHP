// @flow
import type { Parent } from 'unist'
import type { Marker } from 'mdast-comment-marker'
import type { VFile } from 'vfile'

export default class DirectiveCommentVisitor<Options> {
  static typePath: Array<string> = []
  static directiveName: string = ''
  static reverse = false

  constructor (vfile: VFile, options: Options) {
    this.vfile = vfile
    this.options = options
  }

  vfile: VFile
  options: Options

  beforeVisiting (parent: Parent, depth: number) {
  }

  afterVisiting (parent: Parent, depth: number) {
  }

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
  }
}
