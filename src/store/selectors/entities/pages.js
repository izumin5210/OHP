// @flow
import { createSelector } from 'reselect'
import memoize from 'lodash/memoize'

import type { Map } from 'immutable'
import type Page from 'entities/Page'
import type { Position } from 'types'
import type { RootState } from 'store/modules'
import type { PagesState } from 'store/modules/entities/pages'

export const getPagesState = ({ entities }: RootState) => entities.pages
export const getPageByUid = createSelector(
  getPagesState,
  ({ pageByUid }: PagesState) => pageByUid
)

type CompareResult = -1 | 0 | 1
function compare (a: number, b: number): CompareResult {
  return a < b ? -1 : (a === b ? 0 : 1)
}

function isCursorInsidePage ({ cursor, page }: { cursor: Position, page: Page }): boolean {
  const { row, column } = cursor
  const { beginAt, endAt } = page
  const rb = beginAt == null ? 1 : compare(row, beginAt.row)
  const cb = beginAt == null ? 1 : compare(column, beginAt.column)
  if (rb > 0 || (rb === 0 && cb >= 0)) {
    const re = endAt == null ? -1 : compare(row, endAt.row)
    const ce = endAt == null ? -1 : compare(column, endAt.column)
    return re < 0 || (re === 0 && ce < 0)
  }
  return false
}

export const createGetPageByCursorPosition = createSelector(
  getPageByUid,
  (pageByUid: Map<string, Page>) => memoize(
    (cursor: Position) => pageByUid.find((page: Page) => isCursorInsidePage({ cursor, page }))
  )
)
