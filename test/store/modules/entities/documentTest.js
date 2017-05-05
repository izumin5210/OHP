// @flow
import reducer, {
  DocumentState,
  setBody,
} from 'store/modules/entities/document'
import Document from 'entities/Document'

describe('reducer for entities/document', () => {
  let state

  describe(`${setBody.toString()} handler`, () => {
    beforeEach(() => {
      state = new DocumentState({
        entity: new Document(),
      })
    })

    it('sets new body', () => {
      const { entity } = reducer(state, setBody('new body'))
      assert(entity.body === 'new body')
    })
  })
})
