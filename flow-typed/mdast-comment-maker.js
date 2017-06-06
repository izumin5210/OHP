import type { Node } from 'unist'

declare module 'mdast-comment-marker' {
  declare type Marker = {
    name: string,
    attributes: string,
    parameters: Object,
    node: Node,
  }

  declare function marker(node: Node): ?Marker

  declare module.exports: marker
}
