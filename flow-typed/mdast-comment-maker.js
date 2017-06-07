import type { Node } from 'unist'

declare module 'mdast-comment-marker' {
  declare export type Marker = {
    name: string,
    attributes: string,
    parameters: Object,
    node: Node,
  }

  declare export default function marker(node: Node): ?Marker
}
