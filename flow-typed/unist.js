declare module 'unist' {
  declare export type Data = {
  }

  declare export type Position = {
    line: number,
    column: number,
    offset: ?number,
  }

  declare export type Location = {
    start: Position,
    end: Position,
    indent: ?number,
  }

  declare export type Node = {
    type: string,
    data: Data,
    position: Location,
  }

  declare export type Parent = Node & {
    children: Array<Node>,
  }

  declare export type Text = Node & {
    value: string,
  }
}
