// @flow
import type { HTML } from 'mdast'

export function isComment ({ value }: HTML): boolean {
  return value.startsWith('<!--') && value.endsWith('-->')
}
