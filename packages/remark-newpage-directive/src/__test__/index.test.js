// @flow
import remark from 'remark'
import html from 'remark-html'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import plugin, { createHandler } from '..'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string, opts: any) {
  const pageHandler = createHandler('div')
  return remark()
    .use(plugin, opts)
    .use(html, { handlers: { page: pageHandler } })
    .processSync(value)
    .toString()
}

[
  { type: 'normal', options: {} },
  { type: 'no-newpage', options: {} },
  { type: 'classname', options: { className: 'page' } },
  { type: 'with-position', options: { withPosition: true } },
].forEach(({ type, options }) => {
  test(`it works on ${type}`, () => {
    const dir = join(FIXTURES, type)
    const input = read(join(dir, 'input.md'), 'utf-8')
    const output = read(join(dir, 'output.html'), 'utf-8')

    expect(process(input, options)).toBe(output)
  })
})
