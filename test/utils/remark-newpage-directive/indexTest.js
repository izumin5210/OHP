// @flow
import remark from 'remark'
import html from 'remark-html'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import newpage from 'utils/remark-newpage-directive'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string) {
  return remark().use(newpage).use(html).processSync(value).toString()
}

describe('remark-newpage-directive', () => {
  [
    'normal',
  ].forEach((fixture) => {
    it(`should work on ${fixture}`, () => {
      const dir = join(FIXTURES, fixture)
      const input = read(join(dir, 'input.md'), 'utf-8')
      const output = read(join(dir, 'output.html'), 'utf-8')

      assert(process(input) === output)
    })
  })
})
