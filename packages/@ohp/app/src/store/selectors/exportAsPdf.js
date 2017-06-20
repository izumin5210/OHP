// @flow
import { createSelector } from 'reselect'

import type { RootState } from 'store/modules'
import type {
  ExportAsPdfState,
  FetchStatus,
} from 'store/modules/exportAsPdf'

export const getExportAsPdfState = ({ exportAsPdf }: RootState) => exportAsPdf
export const getExportAsPdfStatus = createSelector(
  getExportAsPdfState,
  ({ fetchStatus }: ExportAsPdfState) => fetchStatus,
)
export const isExportingAsPdf = createSelector(
  getExportAsPdfStatus,
  (fetchStatus: FetchStatus) => fetchStatus === 'loading'
)
