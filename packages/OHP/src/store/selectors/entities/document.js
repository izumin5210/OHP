// @flow
import { createSelector } from 'reselect'

import type { RootState } from 'store/modules'
import type { DocumentState } from 'store/modules/entities/document'
import type Document from 'entities/Document'

export const getDocumentState = ({ entities }: RootState) => entities.document
export const getDocument = createSelector(
  getDocumentState,
  ({ entity }: DocumentState) => entity,
)
export const getUrl = createSelector(
  getDocument,
  ({ url }: Document) => url,
)
export const getBody = createSelector(
  getDocument,
  ({ body }: Document) => body,
)
export const isSaved = createSelector(
  getDocumentState,
  ({ saved }: DocumentState) => saved,
)
