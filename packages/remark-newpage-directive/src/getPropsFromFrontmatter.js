// @flow
import type { VFile } from 'vfile'

export default function getPropsFronFrontmatter (
  vfile: VFile,
  pathInFrontmatter: Array<string> | string,
): Object {
  // $FlowFixMe
  const { meta } = vfile

  if (meta == null) {
    return {}
  }

  if (typeof pathInFrontmatter === 'string') {
    return meta[pathInFrontmatter] || {}
  } else if (Array.isArray(pathInFrontmatter)) {
    return pathInFrontmatter.reduce((obj: Object, path: string) => (obj || {})[path] || {}, meta) || {}
  }

  throw new Error('Invalid options')
}
