// @flow
import type { Parent } from 'unist'

export type Props = {
  className?: string,
}

export type Options = Props & {
  typeName?: string,
  pathInFrontmatter?: Array<string> | string,
  withPosition?: boolean,
}

export type Page = Parent & { type: 'page' }
