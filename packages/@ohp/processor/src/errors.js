// @flow
import type { Position } from 'unist'

export class InvalidDocumentError extends Error {
  constructor (message: string, start: Position, end: Position) {
    super(message)
    this.start = start
    this.end = end
  }

  start: Position
  end: Position
}
