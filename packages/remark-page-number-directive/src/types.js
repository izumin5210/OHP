// @flow
import type { Text } from 'unist'

export type Props = {
  enable?: boolean,
  className?: string,
  number?: number,
}

export type Options = {
  typeName?: string,
  tagName?: string,
  pathInFrontmatter?: Array<string> | String,
  removeDisabledNumber?: boolean,
  defaultProps?: Props
}

export type PageNumber = Text & { type: 'pageNumber' }
