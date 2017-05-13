// @flow
import { createSelector } from 'reselect'

import type { RootState } from 'store/modules'
import type { DocumentState, DocumentStateConfig } from 'store/modules/entities/document'
import type Document, { DocumentConfig } from 'entities/Document'

export const getDocumentState = ({ entities }: RootState) => entities.document
export const getDocument = createSelector(
  getDocumentState,
  ({ entity }: DocumentState & DocumentStateConfig) => entity,
)
export const getUrl = createSelector(
  getDocument,
  ({ url }: Document & DocumentConfig) => url,
)
export const getBody = createSelector(
  getDocument,
  ({ body }: Document & DocumentConfig) => body,
)
export const isSaved = createSelector(
  getDocumentState,
  ({ saved }: DocumentState & DocumentStateConfig) => saved,
)
