// @flow
import remark from 'remark'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import outline from 'utils/remark-outline'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string) {
  return remark().use(outline).processSync(value).toString()
}

describe('remark-outline', () => {
  [
    'normal',
    'no-headings',
  ].forEach((fixture) => {
    it(`should work on ${fixture}`, () => {
      const dir = join(FIXTURES, fixture)
      const input = read(join(dir, 'input.md'), 'utf-8')
      const output = read(join(dir, 'output.md'), 'utf-8')

      assert(process(input) === output)
    })
  })
})
