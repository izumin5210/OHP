// @flow
import remark from 'remark'
import html from 'remark-html'
import metaPlugin from 'remark-yaml-meta'
import newpagePlugin, { createHandler as createPageHandler } from 'remark-newpage-directive'
import insertPageNumberPlugin, { createHandler as createPageNumberHandler } from 'remark-insert-page-number'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import plugin from '..'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string, opts: any = {}): string {
  const pageHandler = createPageHandler('div')
  const pageNumberHandler = createPageNumberHandler('span')
  return remark()
    .use(metaPlugin)
    .use(newpagePlugin)
    .use(insertPageNumberPlugin)
    .use(plugin, opts)
    .use(html, { handlers: { page: pageHandler, pageNumber: pageNumberHandler } })
    .processSync(value).toString()
}

[
  { type: 'normal', options: {} },
  { type: 'defaults', options: {} },
].forEach(({ type, options }) => {
  test(`it works on ${type}`, () => {
    const dir = join(FIXTURES, type)
    const input = read(join(dir, 'input.md'), 'utf-8')
    const output = read(join(dir, 'output.html'), 'utf-8')

    expect(process(input, options)).toBe(output)
  })
})
