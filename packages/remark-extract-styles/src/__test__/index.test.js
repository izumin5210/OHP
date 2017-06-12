// @flow
import remark from 'remark'
import html from 'remark-html'
import { readFileSync as read } from 'fs'
import { join } from 'path'

import plugin from '..'

const FIXTURES = join(__dirname, 'fixtures')

function process (value: string, opts: any) {
  return remark().use(plugin, opts).use(html).processSync(value)
}

[
  { type: 'normal', styleCount: 3, options: {} },
  { type: 'no-styles', styleCount: 0, options: {} },
].forEach(({ type, styleCount, options }) => {
  test(`it works on ${type}`, () => {
    const dir = join(FIXTURES, type)
    const input = read(join(dir, 'input.md'), 'utf-8')
    const output = read(join(dir, 'output.html'), 'utf-8')
    const styles = new Array(styleCount).map((_, i) => read(join(dir, `output${i + 1}.css`), 'utf-8'))

    const vfile = process(input, options)
    expect(vfile.toString()).toBe(output)
    expect(vfile.styles.length).toBe(styleCount)
    styles.forEach((style, i) => {
      expect(vfile.styles[i]).toBe(style)
    })
  })
})
