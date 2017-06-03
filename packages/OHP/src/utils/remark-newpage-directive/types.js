// @flow
import type { Parent } from 'unist'
import type { VFile as VFileOrigin } from 'vfile'

export type Options = {
  typeName?: string,
  tagName?: string,
  withPosition: boolean,
}

export type Meta = {
  page?: {
    className?: string,
  }
}

export type VFile = {
  meta?: Meta,
} & VFileOrigin

export interface Page extends Parent {
  type: 'page',
}
