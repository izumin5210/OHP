// @flow
import remark from 'remark'
import html from 'remark-html'
import metaPlugin from 'remark-yaml-meta'
import newpagePlugin from 'remark-newpage-directive'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import plugin from '..'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string, opts: any = {}, plugins: Array<*> = [metaPlugin, newpagePlugin]): string {
  return plugins.reduce((r, p) => r.use(p), remark())
    .use(plugin, opts)
    .use(html)
    .processSync(value).toString()
}

[
  { type: 'frontmatter' },
  { type: 'frontmatterSimple' },
  { type: 'noPages', plugins: [] },
  { type: 'normal' },
  { type: 'options', options: { defaultProps: { enable: false, className: 'options', number: 3 } } },
  { type: 'optionsWithFrontmatter', options: { defaultProps: { enable: true, className: 'options', number: 5 } } },
  { type: 'pathInFrontmatter', options: { pathInFrontmatter: ['defaults', 'page', 'number'] } },
  { type: 'tagName', options: { tagName: 'footer' } },
].forEach(({ type, options, plugins }: { type: string, options?: any, plugins?: Array<*> }) => {
  test(`it works on ${type}`, () => {
    const dir = join(FIXTURES, type)
    const input = read(join(dir, 'input.md'), 'utf-8')
    const output = read(join(dir, 'output.html'), 'utf-8')

    expect(process(input, options, plugins)).toBe(output)
  })
})
