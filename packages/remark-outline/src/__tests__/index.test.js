// @flow
import remark from 'remark'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import plugin from '..'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string, options: any): string {
  return remark().use(plugin).processSync(value).toString()
}

[
  { type: 'normal' },
  { type: 'no-headings' },
].forEach(({ type }) => {
  test(`it works on ${type}`, () => {
    const dir = join(FIXTURES, type)
    const input = read(join(dir, 'input.md'), 'utf-8')
    const output = read(join(dir, 'output.md'), 'utf-8')

    expect(process(input)).toBe(output)
  })
})
