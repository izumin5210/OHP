// @flow
import { createSelector } from 'reselect'
import memoize from 'lodash/memoize'

import type { IndexedSeq, Map } from 'immutable'
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

function pageOrderComparator (p1: Page, p2: Page) {
  if (p1.beginAt == null) {
    return -1
  }
  if (p2.beginAt == null) {
    return 1
  }
  switch (true) {
    case p1.beginAt.row < p2.beginAt.row:
      return -1
    case p1.beginAt.row > p2.beginAt.row:
      return 1
    default:
      return p1.beginAt.column <= p2.beginAt.column ? -1 : 1
  }
}

export const createGetPageByCursorPosition = createSelector(
  getPageByUid,
  (pageByUid: Map<string, Page>) => memoize(
    (cursor: Position) => pageByUid.find((page: Page) => isCursorInsidePage({ cursor, page }))
  )
)

export const getOrderedUids = createSelector(
  getPageByUid,
  (pageByUid: Map<string, Page>) => (
    pageByUid
      .sortBy(
        page => page,
        pageOrderComparator,
      )
      .keySeq()
  )
)

export const createGetOrderByUid = createSelector(
  getOrderedUids,
  (uids: IndexedSeq<string>) => memoize(
    (uid: string) => {
      const order = uids.indexOf(uid)
      return order === -1 ? 0 : order
    }
  )
)
