// @flow
import type { VFile } from 'vfile'
import type { Props } from './types'

export default function getPropsFronFrontmatter (
  vfile: VFile,
  pathInFrontmatter: Array<string> | string,
): Props | boolean {
  // $FlowFixMe
  const { meta } = vfile

  if (meta == null) {
    return {}
  }

  if (typeof pathInFrontmatter === 'string') {
    return meta[pathInFrontmatter]
  } else if (Array.isArray(pathInFrontmatter)) {
    return pathInFrontmatter.reduce((obj: Object, path: string) => (obj || {})[path] || {}, meta)
  }

  throw new Error('Invalid options')
}
