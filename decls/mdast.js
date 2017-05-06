import type { Node, Parent, Text } from 'unist'

declare module 'mdast' {
  declare interface Root extends Parent {
    type: 'root',
  }

  declare interface Paragraph extends Parent {
    type: 'paragraph',
  }

  declare interface Blockquote extends Parent {
    type: 'blockquote',
  }

  declare type headingDepth = 1 | 2 | 3 | 4 | 5 | 6

  declare interface Heading extends Parent {
    type: 'heading',
    depth: headingDepth,
  }

  declare interface Code extends Text {
    type: 'code',
    lang: ?string,
  }

  declare interface InlineCode extends Text {
    type: 'inlineCode',
  }

  declare interface YAML extends Text {
    type: 'yaml',
  }

  declare interface HTML extends Text {
    type: 'html',
  }

  declare interface List extends Parent {
    type: 'list',
    ordered: boolean,
    start: ?number,
    loose: boolean,
  }

  declare interface ListItem extends Parent {
    type: 'listItem',
    loose: boolean,
    checked: ?boolean,
  }

  declare type alignType = 'left' | 'right' | 'center' | null

  declare interface Table extends Parent {
    type: 'table',
    align: Array<alignType>,
  }

  declare interface TableRow extends Parent {
    type: 'tableRow',
  }

  declare interface TableCell extends Parent {
    type: 'tableCell',
  }

  declare interface ThematicBreak extends Node {
    type: 'thematicBreak',
  }

  declare interface Break extends Node {
    type: 'break',
  }

  declare interface Emphasis extends Parent {
    type: 'emphasis',
  }

  declare interface Strong extends Parent {
    type: 'strong',
  }

  declare interface Delete extends Parent {
    type: 'delete',
  }

  declare interface Link extends Parent {
    type: 'link',
    title: ?string,
    url: string,
  }

  declare interface Image extends Node {
    type: 'image',
    title: ?string,
    alt: ?string,
    url: string,
  }

  declare interface Footnote extends Parent {
    type: 'footnote',
  }

  declare type referenceType = 'shortcut' | 'collapsed' | 'full'

  declare interface LinkReference extends Node {
    type: 'linkReference',
    identifier: string,
    referenceType: referenceType,
  }

  declare interface ImageReference extends Node {
    type: 'imageReference',
    identifier: string,
    referenceType: referenceType,
    alt: ?string,
  }

  declare interface FootnoteReference extends Node {
    type: 'footnoteReference',
    identifier: string,
  }

  declare interface Definition extends Node {
    type: 'definition',
    identifier: string,
    title: ?string,
    url: string,
  }

  declare interface FootnoteDefinition extends Node {
    type: 'footnoteDefinition',
    identifier: string,
  }

  declare interface TextNode extends Text {
    type: 'text',
  }
}
