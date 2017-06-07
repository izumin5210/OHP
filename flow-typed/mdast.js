import type { Node, Parent, Text } from 'unist'

declare module 'mdast' {
  declare export type Root = Parent & {
    type: 'root',
  }

  declare export type Paragraph = Parent & {
    type: 'paragraph',
  }

  declare export type Blockquote = Parent & {
    type: 'blockquote',
  }

  declare export type headingDepth = 1 | 2 | 3 | 4 | 5 | 6

  declare export type Heading = Parent & {
    type: 'heading',
    depth: headingDepth,
  }

  declare export type Code = Text & {
    type: 'code',
    lang: ?string,
  }

  declare export type InlineCode = Text & {
    type: 'inlineCode',
  }

  declare export type YAML = Text & {
    type: 'yaml',
  }

  declare export type HTML = Text & {
    type: 'html',
  }

  declare export type List = Parent & {
    type: 'list',
    ordered: boolean,
    start: ?number,
    loose: boolean,
  }

  declare export type ListItem = Parent & {
    type: 'listItem',
    loose: boolean,
    checked: ?boolean,
  }

  declare export type alignType = 'left' | 'right' | 'center' | null

  declare export type Table = Parent & {
    type: 'table',
    align: Array<alignType>,
  }

  declare export type TableRow = Parent & {
    type: 'tableRow',
  }

  declare export type TableCell = Parent & {
    type: 'tableCell',
  }

  declare export type ThematicBreak = Node & {
    type: 'thematicBreak',
  }

  declare export type Break = Node & {
    type: 'break',
  }

  declare export type Emphasis = Parent & {
    type: 'emphasis',
  }

  declare export type Strong = Parent & {
    type: 'strong',
  }

  declare export type Delete = Parent & {
    type: 'delete',
  }

  declare export type Link = Parent & {
    type: 'link',
    title: ?string,
    url: string,
  }

  declare export type Image = Node & {
    type: 'image',
    title: ?string,
    alt: ?string,
    url: string,
  }

  declare export type Footnote = Parent & {
    type: 'footnote',
  }

  declare export type referenceType = 'shortcut' | 'collapsed' | 'full'

  declare export type LinkReference = Node & {
    type: 'linkReference',
    identifier: string,
    referenceType: referenceType,
  }

  declare export type ImageReference = Node & {
    type: 'imageReference',
    identifier: string,
    referenceType: referenceType,
    alt: ?string,
  }

  declare export type FootnoteReference = Node & {
    type: 'footnoteReference',
    identifier: string,
  }

  declare export type Definition = Node & {
    type: 'definition',
    identifier: string,
    title: ?string,
    url: string,
  }

  declare export type FootnoteDefinition = Node & {
    type: 'footnoteDefinition',
    identifier: string,
  }

  declare export type TextNode = Text & {
    type: 'text',
  }
}
