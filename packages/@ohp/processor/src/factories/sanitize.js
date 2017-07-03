// @flow
import githubSanitize from 'hast-util-sanitize/lib/github'
import merge from 'deepmerge'

const sanitize = merge(
  githubSanitize,
  {
    tagNames: [
      'page',
      'pageNumber',
    ],
    attributes: {
      '*': ['className'],
      'page': ['beginLineAt', 'beginColumnAt', 'endLineAt', 'endColumnAt'],
      'pageNumber': ['enable', 'number'],
      'a': ['depth'],
    }
  },
)

export default sanitize
