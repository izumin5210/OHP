// @flow
import { createSelector } from 'reselect'
import remark from 'remark'
import remarkRenderer from 'remark-react'
import remarkOutline from 'utils/remark-outline'

import { getBody as getRawBody } from './entities/document'

const bodyProcessor = remark().use(remarkRenderer)
const outlineProcessor = remark().use(remarkOutline).use(remarkRenderer)

export const getBodyAst = createSelector(
  getRawBody,
  (body: string) => bodyProcessor.processSync(body),
)

export const getOutlineAst = createSelector(
  getRawBody,
  (body: string) => outlineProcessor.processSync(body),
)

export const getBodyElement = createSelector(
  getBodyAst,
  ({ contents }: any) => contents,
)

export const getOutlineElement = createSelector(
  getOutlineAst,
  ({ contents }: any) => contents,
)
