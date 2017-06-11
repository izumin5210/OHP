// @flow
import type { Text } from 'unist'

export type Props = {
  typeName?: string,
  className?: string,
  number?: number,
  enable?: boolean,
}

export type Options = {
  tagName?: string,
  pathInFrontmatter?: Array<string> | string,
  defaultProps?: Props,
}

export type PageNumber = Text & { type: 'pageNumber' }
