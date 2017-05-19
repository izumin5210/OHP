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
