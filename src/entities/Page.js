// @flow
import { Record } from 'immutable'

import { hex } from 'utils/random'
import type { Position } from 'types'

export type PageConfig = {
  uid: string,
  beginAt: ?Position,
  endAt: ?Position,
}

const defaultValue: PageConfig = {
  uid: '0000000000000000',
  beginAt: null,
  endAt: null,
}

export default class Page extends Record(defaultValue) {
  static uidLength = 16

  static generateUid (): string {
    return hex(this.uidLength)
  }

  // To suppress a following error:
  //   constructor call. Type is incompatible with (unclassified use type: ObjTestT) any member of intersection type
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<PageConfig>) {
    super(values)
  }

  uid: string
  beginAt: ?Position
  endAt: ?Position
}
