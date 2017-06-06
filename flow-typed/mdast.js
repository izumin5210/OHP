import type { Node, Parent, Text } from 'unist'

declare module 'mdast' {
  declare var Root: typeof mdast$Root
  declare var Paragraph: typeof $mdastParagraph
  declare var Blockquote: typeof mdast$Blockquote
  declare var Heading: typeof mdast$Heading
  declare var Code: typeof mdast$Code
  declare var InlineCode: typeof mdast$InlineCode
  declare var YAML: typeof mdast$YAML
  declare var HTML: typeof mdast$HTML
  declare var List: typeof mdast$List
  declare var ListItem: typeof mdast$ListItem
  declare var Table: typeof mdast$Table
  declare var TableRow: typeof mdast$TableRow
  declare var TableCell: typeof mdast$TableCell
  declare var ThematicBreak: typeof mdast$ThematicBreak
  declare var Break: typeof mdast$Break
  declare var Emphasis: typeof mdast$Emphasis
  declare var Strong: typeof mdast$Strong
  declare var Delete: typeof mdast$Delete
  declare var Link: typeof mdast$Link
  declare var Image: typeof mdast$Image
  declare var Footnote: typeof mdast$Footnote
  declare var LinkReference: typeof mdast$LinkReference
  declare var ImageReference: typeof mdast$ImageReference
  declare var FootnoteReference: typeof mdast$FootnoteReference
  declare var Definition: typeof mdast$Definition
  declare var FootnoteDefinition: typeof mdast$FootnoteDefinition
  declare var TextNode: typeof mdast$TextNode
  declare var Root: typeof mdast$Root;
  declare var Paragraph: typeof mdast$Paragraph;
  declare var Blockquote: typeof mdast$Blockquote;
  declare var Heading: typeof mdast$Heading;
  declare var Code: typeof mdast$Code;
  declare var InlineCode: typeof mdast$InlineCode;
  declare var YAML: typeof mdast$YAML;
  declare var HTML: typeof mdast$HTML;
  declare var List: typeof mdast$List;
  declare var ListItem: typeof mdast$ListItem;
  declare var Table: typeof mdast$Table;
  declare var TableRow: typeof mdast$TableRow;
  declare var TableCell: typeof mdast$TableCell;
  declare var ThematicBreak: typeof mdast$ThematicBreak;
  declare var Break: typeof mdast$Break;
  declare var Emphasis: typeof mdast$Emphasis;
  declare var Strong: typeof mdast$Strong;
  declare var Delete: typeof mdast$Delete;
  declare var Link: typeof mdast$Link;
  declare var Image: typeof mdast$Image;
  declare var Footnote: typeof mdast$Footnote;
  declare var LinkReference: typeof mdast$LinkReference;
  declare var ImageReference: typeof mdast$ImageReference;
  declare var FootnoteReference: typeof mdast$FootnoteReference;
  declare var Definition: typeof mdast$Definition;
  declare var FootnoteDefinition: typeof mdast$FootnoteDefinition;
  declare var TextNode: typeof mdast$TextNode;
}

declare class mdast$Root extends Parent {
  type: 'root',
}

declare class mdast$Paragraph extends Parent {
  type: 'paragraph',
}

declare class mdast$Blockquote extends Parent {
  type: 'blockquote',
}

declare type headingDepth = 1 | 2 | 3 | 4 | 5 | 6

declare class mdast$Heading extends Parent {
  type: 'heading',
  depth: headingDepth,
}

declare class mdast$Code extends Text {
  type: 'code',
  lang: ?string,
}

declare class mdast$InlineCode extends Text {
  type: 'inlineCode',
}

declare class mdast$YAML extends Text {
  type: 'yaml',
}

declare class mdast$HTML extends Text {
  type: 'html',
}

declare class mdast$List extends Parent {
  type: 'list',
  ordered: boolean,
  start: ?number,
  loose: boolean,
}

declare class mdast$ListItem extends Parent {
  type: 'listItem',
  loose: boolean,
  checked: ?boolean,
}

declare type alignType = 'left' | 'right' | 'center' | null

declare class mdast$Table extends Parent {
  type: 'table',
  align: Array<alignType>,
}

declare class mdast$TableRow extends Parent {
  type: 'tableRow',
}

declare class mdast$TableCell extends Parent {
  type: 'tableCell',
}

declare class mdast$ThematicBreak extends Node {
  type: 'thematicBreak',
}

declare class mdast$Break extends Node {
  type: 'break',
}

declare class mdast$Emphasis extends Parent {
  type: 'emphasis',
}

declare class mdast$Strong extends Parent {
  type: 'strong',
}

declare class mdast$Delete extends Parent {
  type: 'delete',
}

declare class mdast$Link extends Parent {
  type: 'link',
  title: ?string,
  url: string,
}

declare class mdast$Image extends Node {
  type: 'image',
  title: ?string,
  alt: ?string,
  url: string,
}

declare class mdast$Footnote extends Parent {
  type: 'footnote',
}

declare type referenceType = 'shortcut' | 'collapsed' | 'full'

declare class mdast$LinkReference extends Node {
  type: 'linkReference',
  identifier: string,
  referenceType: referenceType,
}

declare class mdast$ImageReference extends Node {
  type: 'imageReference',
  identifier: string,
  referenceType: referenceType,
  alt: ?string,
}

declare class mdast$FootnoteReference extends Node {
  type: 'footnoteReference',
  identifier: string,
}

declare class mdast$Definition extends Node {
  type: 'definition',
  identifier: string,
  title: ?string,
  url: string,
}

declare class mdast$FootnoteDefinition extends Node {
  type: 'footnoteDefinition',
  identifier: string,
}

declare class mdast$TextNode extends Text {
  type: 'text',
}
