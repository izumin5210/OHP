// @flow
import { Record } from 'immutable'

export type Mode = 'markdown'

export type DocumentConfig = {
  url: string,
  body: string,
  mode: Mode,
}

const defaultValue: $Shape<DocumentConfig> = {
  url: '',
  body: '',
  mode: 'markdown',
}

export default class Document extends Record(defaultValue) {
  // To suppress a following error:
  //   constructor call. Type is incompatible with (unclassified use type: ObjTestT) any member of intersection type
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<DocumentConfig>) {
    super(values)
  }

  url: string
  body: string
  mode: Mode
}
