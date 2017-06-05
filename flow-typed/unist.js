declare module 'unist' {
  declare var Data: unist$Data;
  declare var Position: unist$Position;
  declare var Location: unist$Location;
  declare var Node: typeof unist$Node;
  declare var Parent: typeof unist$Parent;
  declare var Text: typeof unist$Text;
}

declare type unist$Data = {
}

declare type unist$Position = {
  line: number,
  column: number,
  offset: ?number,
}

declare type unist$Location = {
  start: unist$Position,
  end: unist$Position,
  indent: ?number,
}

declare class unist$Node {
  type: string,
  data: unist$Data,
  position: unist$Location,
}

declare class unist$Parent extends unist$Node {
  children: Array<unist$Node>,
}

declare class unist$Text extends unist$Node {
  value: string,
}
