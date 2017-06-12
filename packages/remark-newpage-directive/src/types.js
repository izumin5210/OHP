// @flow
import type { Parent } from 'unist'

export type Options = {
  typeName?: string,
  pathInFrontmatter?: Array<string> | string,
  withPosition?: boolean,
  className?: string,
}

export type Page = Parent & { type: 'page' }
