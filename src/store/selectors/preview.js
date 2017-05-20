// @flow
import { createSelector } from 'reselect'

import type { RootState } from 'store/modules'
import type { PreviewState } from 'store/modules/preview'

export const getPreviewState = ({ preview }: RootState) => preview

export const getBody = createSelector(
  getPreviewState,
  ({ body }: PreviewState) => body,
)

export const getOutline = createSelector(
  getPreviewState,
  ({ outline }: PreviewState) => outline,
)

export const getMeta = createSelector(
  getBody,
  ({ meta }: any) => meta,
)

export const getBaseFontSize = createSelector(
  getMeta,
  (meta: any) => meta && meta.fontSize,
)

export const getStyles = createSelector(
  getBody,
  ({ styles }: any) => styles,
)
