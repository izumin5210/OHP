// @flow
import { bodyToReactFactory, outlineToReactFactory } from './factories'
import { InvalidDocumentError } from './errors'
import type { Options, Result } from './types'

export default class Processor {
  constructor ({ body, outline }: Options = {}) {
    this.bodyToReact = bodyToReactFactory((body ? body.componentByName : null) || {})
    this.outlineToReact = outlineToReactFactory((outline ? outline.componentByName : null) || {})
  }

  bodyToReact: any
  outlineToReact: any

  process = async (body: string): Promise<Result> => {
    try {
      const [bodyVfile, outlineVfile] = await Promise.all([
        this.bodyToReact.process(body),
        this.outlineToReact.process(body),
      ])
      return {
        body: bodyVfile.contents,
        outline: outlineVfile.contents,
        styles: bodyVfile.styles,
        meta: bodyVfile.meta,
      }
    } catch (err) {
      const location: ?Location = err.location
      if (location != null) {
        throw new InvalidDocumentError(err.message, location.start, location.end)
      }
      throw err
    }
  }
}
