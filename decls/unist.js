declare module 'unist' {
  declare interface Data {
  }

  declare interface Position {
    line: number,
    column: number,
    offset: ?number,
  }

  declare interface Location {
    start: Position,
    end: Position,
    indent: ?number,
  }

  declare interface Node {
    type: string,
    data: Data,
    position: Location,
  }

  declare interface Parent extends Node {
    children: Array<Node>,
  }

  declare interface Text extends Node {
    value: string,
  }
}
