// @flow
import type { Parent } from 'unist'

export type Options = {
  typeName?: string,
  className?: string,
  withPosition?: boolean,
}

export type Page = Parent & { type: 'page' }
