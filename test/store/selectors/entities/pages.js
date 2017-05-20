// @flow
import { Map } from 'immutable'

import {
  getOrderedUids,
  createGetOrderByUid,
  createGetPageByCursorPosition,
} from 'store/selectors/entities/pages'
import { PagesState } from 'store/modules/entities/pages'
import Page from 'entities/Page'

import type { PagesStateConfig } from 'store/modules/entities/pages'

const createStore = (state: PagesStateConfig) => ({
  entities: {
    pages: new PagesState(state),
  },
})

describe('selectors for entities/pages', () => {
  let store

  describe('createGetPageByCursorPosition', () => {
    let getPageByCursorPosition

    beforeEach(() => {
      const pageValues = [
        { uid: 'a', beginAt: null, endAt: { row: 2, column: 0 } },
        { uid: 'b', beginAt: { row: 2, column: 0 }, endAt: { row: 4, column: 4 } },
        { uid: 'c', beginAt: { row: 4, column: 4 }, endAt: { row: 4, column: 8 } },
        { uid: 'd', beginAt: { row: 4, column: 8 }, endAt: null },
      ]
      const pageByUid = Map(pageValues.map(v => ([v.uid, new Page(v)])))
      store = createStore({ pageByUid, topByUid: Map() })
      getPageByCursorPosition = createGetPageByCursorPosition(store)
    })

    const data = [
      { uid: 'a', cursor: { row: 0, column: 1 } },
      { uid: 'b', cursor: { row: 2, column: 0 } },
      { uid: 'b', cursor: { row: 4, column: 3 } },
      { uid: 'c', cursor: { row: 4, column: 4 } },
      { uid: 'c', cursor: { row: 4, column: 7 } },
      { uid: 'd', cursor: { row: 4, column: 8 } },
      { uid: 'd', cursor: { row: 6, column: 0 } },
    ]

    data.forEach(({ uid, cursor }) => {
      it(`returns page ${uid}`, () => {
        assert(getPageByCursorPosition(cursor).uid === uid)
      })
    })
  })

  describe('getOrderedUids', () => {
    beforeEach(() => {
      const pageValues = [
        { uid: 'a', beginAt: { row: 4, column: 8 }, endAt: null },
        { uid: 'b', beginAt: { row: 4, column: 4 }, endAt: { row: 4, column: 8 } },
        { uid: 'c', beginAt: null, endAt: { row: 2, column: 0 } },
        { uid: 'd', beginAt: { row: 2, column: 0 }, endAt: { row: 4, column: 4 } },
      ]
      const pageByUid = Map(pageValues.map(v => ([v.uid, new Page(v)])))
      store = createStore({ pageByUid, topByUid: Map() })
    })

    it('returns ordered page uids', () => {
      assert.deepStrictEqual(getOrderedUids(store).toArray(), ['c', 'd', 'b', 'a'])
    })
  })

  describe('createGetOrderByUid', () => {
    let getOrderByUid

    beforeEach(() => {
      const pageValues = [
        { uid: 'a', beginAt: { row: 4, column: 8 }, endAt: null },
        { uid: 'b', beginAt: { row: 4, column: 4 }, endAt: { row: 4, column: 8 } },
        { uid: 'c', beginAt: null, endAt: { row: 2, column: 0 } },
        { uid: 'd', beginAt: { row: 2, column: 0 }, endAt: { row: 4, column: 4 } },
      ]
      const pageByUid = Map(pageValues.map(v => ([v.uid, new Page(v)])))
      store = createStore({ pageByUid, topByUid: Map() })
      getOrderByUid = createGetOrderByUid(store)
    })

    const data = [
      { uid: 'a', order: 3 },
      { uid: 'b', order: 2 },
      { uid: 'c', order: 0 },
      { uid: 'd', order: 1 },
    ]

    data.forEach(({ uid, order }) => {
      it(`returns ${order} by ${uid}`, () => {
        assert(getOrderByUid(uid) === order)
      })
    })

    it('throws error when it passed unused uid', () => {
      assert.throws(() => { getOrderByUid('e') })
    })
  })
})
