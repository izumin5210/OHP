import type { Node, Parent } from 'unist'

declare module 'unist-util-visit-children' {
  declare type Visitor = (child: Node, index: number, parent: Parent) => void
  declare type Visit = (parent: Parent) => void
  declare function visitChildren(visitor: Visitor): Visit

  declare module.exports: visitChildren
}
