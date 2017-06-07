import type { Node, Location, Position } from 'unist'

declare module 'vfile' {
  declare export type VFile = {
    contents: ?Buffer | ?string,
    cwd: string,
    path: ?string,
    basename: ?string,
    stem: ?string,
    extname: ?string,
    dirname: ?string,
    history: Array<string>,
    messages: Array<VFileMessage>,
    data: Object,
    toString: (encoding?: string) => string,
    message: (reason: string | Error, position?: Node | Location | Position, ruleId?: string) => VFileMessage,
    fail: (reason: string | Error, position?: Node | Location | Position, ruleId?: string) => VFileMessage,
  }

  declare export type VFileMessage = {
    reason: string,
    ruleId: ?string,
    source: ?string,
    stack: ?string,
    fatal: ?boolean,
    line: ?number,
    column: ?number,
    location: ?number,
  }
}
