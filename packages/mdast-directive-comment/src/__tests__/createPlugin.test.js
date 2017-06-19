// @flow
import remark from 'remark'

import type { Parent } from 'unist'
import type { Marker } from 'mdast-comment-marker'

import createPlugin from '../createPlugin'
import DirectiveCommentVisitor from '../DirectiveCommentVisitor'

type Mocks = {
  visit: Function,
  beforeVisiting: Function,
  afterVisiting: Function,
}

const createMocks = () => ({
  visit: jest.fn(),
  beforeVisiting: jest.fn(),
  afterVisiting: jest.fn(),
})

class SimpleVisitor extends DirectiveCommentVisitor<Mocks> {
  static directiveName = 'simple'

  beforeVisiting (parent: Parent, depth: number) {
    this.options.beforeVisiting(parent, depth)
  }

  afterVisiting (parent: Parent, depth: number) {
    this.options.afterVisiting(parent, depth)
  }

  visit (marker: Marker, index: number, parent: ?Parent): ?boolean {
    this.options.visit(marker, index, parent)
  }
}

class ReverseVisitor extends SimpleVisitor {
  static reverse = true
}

class TypePathVisitor extends SimpleVisitor {
  static typePath = ['list', 'listItem']
}

test('does not visit', () => {
  const input = ''
  const mocks = createMocks()
  remark().use(createPlugin(SimpleVisitor), mocks).processSync(input)
  expect(mocks.visit.mock.calls.length).toBe(0)
})

test('visits once w/o params', () => {
  const input = '<!-- simple -->'
  const mocks = createMocks()
  remark().use(createPlugin(SimpleVisitor), mocks).processSync(input)
  expect(mocks.visit.mock.calls.length).toBe(1)
  expect(mocks.visit.mock.calls[0][0].name).toBe('simple')
})

test('visits once w/ params', () => {
  const input = '<!-- simple foo bar=1 baz=qux -->'
  const mocks = createMocks()
  remark().use(createPlugin(SimpleVisitor), mocks).processSync(input)
  const marker = mocks.visit.mock.calls[0][0]
  expect(marker.parameters.foo).toBe(true)
  expect(marker.parameters.bar).toBe(1)
  expect(marker.parameters.baz).toBe('qux')
})

test('visits twice', () => {
  const input = '<!-- simple foo=bar -->\n<!-- simple foo=baz -->'
  const mocks = createMocks()
  remark().use(createPlugin(SimpleVisitor), mocks).processSync(input)
  const marker1 = mocks.visit.mock.calls[0][0]
  const marker2 = mocks.visit.mock.calls[1][0]
  expect(marker1.parameters.foo).toBe('bar')
  expect(marker2.parameters.foo).toBe('baz')
})

test('visits in reverse order', () => {
  const input = '<!-- simple foo=bar -->\n<!-- simple foo=baz -->'
  const mocks = createMocks()
  remark().use(createPlugin(ReverseVisitor), mocks).processSync(input)
  const marker1 = mocks.visit.mock.calls[0][0]
  const marker2 = mocks.visit.mock.calls[1][0]
  expect(marker1.parameters.foo).toBe('baz')
  expect(marker2.parameters.foo).toBe('bar')
})

test('visits comments through key path', () => {
  const input = `
<!-- simple foo=bar -->

- <!-- simple foo=baz -->
- <!-- simple foo=qux -->

<!-- simple foo=quux -->
  `
  const mocks = createMocks()
  remark().use(createPlugin(TypePathVisitor), mocks).processSync(input)
  expect(mocks.visit.mock.calls.length).toBe(2)
  const marker1 = mocks.visit.mock.calls[0][0]
  const marker2 = mocks.visit.mock.calls[1][0]
  expect(marker1.parameters.foo).toBe('baz')
  expect(marker2.parameters.foo).toBe('qux')
})
