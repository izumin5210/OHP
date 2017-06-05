// @flow
import type { HTML } from 'mdast'

export function isComment ({ value }: any): boolean {
  return value.startsWith('<!--') && value.endsWith('-->')
}
