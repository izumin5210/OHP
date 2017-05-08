/* @flow */
import { createAction, handleActions } from 'redux-actions'
import { Record } from 'immutable'

/* ======= Types ======= */

export type FetchStatus = 'none' | 'loading' | 'loaded' | 'failed'
export type ExportAsPdfStateConfig = {
  fetchStatus: FetchStatus,
}

const defaultValue: ExportAsPdfStateConfig = {
  fetchStatus: 'none',
}

export class ExportAsPdfState extends Record(defaultValue) {
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<ExportAsPdfStateConfig>) {
    super(values)
  }

  entity: FetchStatus
}

const initialState = new ExportAsPdfState()

/* ======= Actions ======= */

export const prepare = createAction('exportAsPdf:prepare')
export const start = createAction('exportAsPdf:start')

/* ======= Reducer ======= */

export default handleActions({
  [prepare.toString()]: (state: ExportAsPdfState) => {
    return state.set('fetchStatus', 'loading')
  },
}, initialState)
