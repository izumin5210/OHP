// @flow
import type { Component, Element } from 'react'

type ComponentByName = { [key:string]: Class<Component<*, *, *>> }

export type Options = {
  body?: {
    componentByName?: ComponentByName,
  },
  outline?: {
    componentByName?: ComponentByName,
  }
}

export type Result = {
  body: Element<*>,
  outline: Element<*>,
  styles: Array<string>,
  meta: Object,
}
