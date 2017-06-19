// @flow
import { bodyToReactFactory, outlineToReactFactory } from './factories'
import type { Options, Result } from './types'

export default class Processor {
  constructor ({ body, outline }: Options = {}) {
    this.bodyToReact = bodyToReactFactory((body ? body.componentByName : null) || {})
    this.outlineToReact = outlineToReactFactory((outline ? outline.componentByName : null) || {})
  }

  bodyToReact: any
  outlineToReact: any

  process = async (body: string): Promise<Result> => {
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
  }
}
