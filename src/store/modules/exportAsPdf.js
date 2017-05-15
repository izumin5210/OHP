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
  // HACK: for typecheck
  // eslint-disable-next-line no-useless-constructor
  constructor (values: $Shape<ExportAsPdfStateConfig>) {
    super(values)
  }

  // HACK: for typecheck
  fetchStatus: FetchStatus

  // HACK: for typecheck
  set: <K: $Keys<ExportAsPdfStateConfig>>(key: K, value: any) => ExportAsPdfState;
}

const initialState = new ExportAsPdfState()

/* ======= Actions ======= */

const PREPARE = 'exportAsPdf:prepare'
export const prepare = createAction(PREPARE)

const START = 'exportAsPdf:start'
export const start = createAction(START)

const COMPLETE = 'exportAsPdf:complete'
export const complete = createAction(COMPLETE)

/* ======= Reducer ======= */

export default handleActions({
  // HACK: for typecheck
  // [prepare.toString()]: (state: ExportAsPdfState) => {
  [PREPARE]: (state: ExportAsPdfState) => {
    return state.set('fetchStatus', 'loading')
  },

  // HACK: for typecheck
  // [complete.toString()]: (state: ExportAsPdfState) => {
  [COMPLETE]: (state: ExportAsPdfState) => {
    return state.set('fetchStatus', 'loaded')
  },
}, initialState)
