// @flow
import { bodyToReactFactory, outlineToReactFactory } from './factories'
import type { Options, Result } from './types'

export default class Processor {
  constructor (options: Options = {}) {
    this.bodyToReact = bodyToReactFactory(options.componentByName || {})
    this.outlineToReact = outlineToReactFactory(options.componentByName || {})
  }

  bodyToReact: any
  outlineToReact: any

  async process (body: string): Promise<Result> {
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
