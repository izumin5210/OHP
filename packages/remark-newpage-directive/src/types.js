// @flow
import type { Parent } from 'unist'

export type Options = {
  typeName?: string,
  tagName?: string,
  className?: string,
}

export type Page = Parent & { type: 'page' }
