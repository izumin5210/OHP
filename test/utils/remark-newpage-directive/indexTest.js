// @flow
import remark from 'remark'
import html from 'remark-html'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import newpage from 'utils/remark-newpage-directive'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string, opts: any) {
  return remark().use(newpage, opts).use(html).processSync(value).toString()
}

describe('remark-newpage-directive', () => {
  [
    {
      type: 'normal',
      options: {},
    },
    {
      type: 'classname',
      options: { className: 'test-page' },
    },
  ].forEach(({ type, options }) => {
    it(`should work on ${type}`, () => {
      const dir = join(FIXTURES, type)
      const input = read(join(dir, 'input.md'), 'utf-8')
      const output = read(join(dir, 'output.html'), 'utf-8')

      assert(process(input, options) === output)
    })
  })
})
