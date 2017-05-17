import type { Parent } from 'unist'

export type Options = {
  typeName?: string,
  tagName?: string,
  className?: string,
  withPosition: boolean,
}

export interface Page extends Parent {
  type: 'page',
}
