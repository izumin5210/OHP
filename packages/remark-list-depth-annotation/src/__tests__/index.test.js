// @flow
import remark from 'remark'
import html from 'remark-html'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import plugin from '..'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string, opts: any) {
  return remark().use(plugin, opts).use(html).processSync(value).toString()
}

[
  { type: 'normal', options: {} },
  { type: 'target', options: { target: 'link' } },
].forEach(({ type, options }) => {
  test(`it works on ${type}`, () => {
    const dir = join(FIXTURES, type)
    const input = read(join(dir, 'input.md'), 'utf-8')
    const output = read(join(dir, 'output.html'), 'utf-8')

    expect(process(input, options)).toBe(output)
  })
})
