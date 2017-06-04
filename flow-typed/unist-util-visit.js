import type { Node, Parent, Text } from 'unist'

declare module 'unist-util-visit' {
  declare type Visitor = (node: Node, index: ?number, parent: ?Parent) => ?boolean
  declare function visit(node: Node, type?: string, visitor: Visitor, reverse?: boolean): void

  declare module.exports: visit
}

