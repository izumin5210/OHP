// @flow
import remark from 'remark'
import html from 'remark-html'
import metaPlugin from 'remark-yaml-meta'
import newpagePlugin from 'remark-newpage-directive'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import plugin from '..'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string, { newpage = {}, ...opts }: any = {}): string {
  return remark()
    .use(metaPlugin)
    .use(newpagePlugin, newpage)
    .use(plugin, opts)
    .use(html)
    .processSync(value).toString()
}

[
  { type: 'normal', options: {} },
  { type: 'tagName', options: { tagName: 'div' } },
  { type: 'removeDisabledNumber', options: { removeDisabledNumber: true } },
  { type: 'frontmatter', options: {} },
  { type: 'pathInFrontmatter', options: { pathInFrontmatter: ['defaults', 'page', 'number'] } },
].forEach(({ type, options }) => {
  test(`it works on ${type}`, () => {
    const dir = join(FIXTURES, type)
    const input = read(join(dir, 'input.md'), 'utf-8')
    const output = read(join(dir, 'output.html'), 'utf-8')

    expect(process(input, options)).toBe(output)
  })
})
