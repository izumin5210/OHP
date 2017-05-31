// @flow
import remark from 'remark'
import remarkRenderer from 'remark-react'
import remarkYamlMeta from 'remark-yaml-meta'
import remarkOutline from 'utils/remark-outline'
import remarkListDepth from 'utils/remark-list-depth'
import remarkExtractStyles from 'utils/remark-extract-styles'
import remarkNewpageDirective from 'utils/remark-newpage-directive'
import remarkPagePropsDirective from 'utils/remark-page-props-directive'
import remarkPageNumberDirective from 'utils/remark-page-number-directive'

import type { VFile } from 'vfile'

import * as Settings from 'settings/processor'

import type { Options as NewpageOptions } from 'utils/remark-newpage-directive'

type Options = {
  sanitize: Object,
  handlers: { [key: string]: Function },
  components: {
    body: { [key:string]: any },
    outline: { [key:string]: any }
  },
  newpage: NewpageOptions,
}

export default class DocumentProcessor {
  static async execute (
    body: string,
    options: Options = {
      sanitize: Settings.sanitize,
      handlers: Settings.handlers,
      components: {
        body: Settings.components,
        outline: Settings.outlineComponents,
      },
      newpage: Settings.newpage,
    },
  ): Promise<DocumentProcessor> {
    const processor = new DocumentProcessor(options)
    await processor.execute(body)
    return processor
  }

  constructor (
    options: Options,
  ) {
    this.options = options
    this.bodyProcessor = this.buildBodyProcessor()
    this.outlineProcessor = this.buildOutlineProcessor()
  }

  options: Options
  bodyProcessor: any
  outlineProcessor: any
  body: VFile
  outline: VFile

  async execute (body: string) {
    const [bodyVfile, outlineVfile] = await Promise.all([
      this.bodyProcessor.process(body),
      this.outlineProcessor.process(body),
    ])
    this.body = bodyVfile
    this.outline = outlineVfile
  }

  buildBodyProcessor () {
    return remark()
      .use(remarkYamlMeta)
      .use(remarkNewpageDirective, this.options.newpage || {})
      .use(remarkPagePropsDirective)
      .use(remarkPageNumberDirective)
      .use(remarkExtractStyles)
      .use(remarkRenderer, this.rendererOptions)
  }

  buildOutlineProcessor () {
    return remark()
      .use(remarkOutline)
      .use(remarkListDepth)
      .use(remarkRenderer, this.outlineRendererOptions)
  }

  get rendererOptions (): Object {
    const { sanitize, handlers, components } = this.options
    return {
      sanitize,
      toHast: {
        handlers,
      },
      remarkReactComponents: components.body,
    }
  }

  get outlineRendererOptions (): Object {
    const { sanitize, handlers, components } = this.options
    return {
      sanitize,
      toHast: {
        handlers,
      },
      remarkReactComponents: components.outline,
    }
  }
}
