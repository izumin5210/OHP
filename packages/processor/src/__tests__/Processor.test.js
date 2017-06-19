// @flow
import React from 'react'
import renderer from 'react-test-renderer'

import { readFileSync as read } from 'fs'
import { join } from 'path'

import Processor from '../Processor'

const FIXTURES = join(__dirname, 'fixtures')

// eslint-disable-next-line react/prop-types
function Page ({ beginLineAt, beginColumnAt, endLineAt, endColumnAt, children, className }) {
  const chunks = []
  if (beginLineAt != null && beginColumnAt != null) {
    chunks.push(`Ln ${beginLineAt}, Col ${beginColumnAt}`)
  }
  chunks.push('~')
  if (endLineAt != null && endColumnAt != null) {
    chunks.push(`Ln ${endLineAt}, Col ${endColumnAt}`)
  }
  return (
    <section {...{ className }}>
      { children }
      <footer>
        { chunks.join(' ') }
      </footer>
    </section>
  )
}

// eslint-disable-next-line react/prop-types
function PageNumber ({ number, enable, className }) {
  if (!enable) {
    return false
  }

  return (
    <span {...{ className }}>
      { number }
    </span>
  )
}

const testcases: Array<{ type: string, options?: any }> = [
  { type: 'simple' },
  { type: 'styles' },
  { type: 'page', options: { body: { componentByName: { page: Page } } } },
  { type: 'pageNumber', options: { body: { componentByName: { pageNumber: PageNumber } } } },
]

testcases.forEach(({ type, options }) => {
  describe(`Processing ${type} document`, () => {
    let result

    beforeEach(async () => {
      const processor = new Processor(options)
      const input = read(join(FIXTURES, `${type}.md`), 'utf-8')
      result = await processor.process(input)
    })

    it('returns react components for body correctly', () => {
      const component = renderer.create(result.body)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('returns react components for outline correctly', () => {
      const component = renderer.create(result.outline)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('returns empty styles', () => {
      expect(result.styles).toMatchSnapshot()
    })
  })
})
