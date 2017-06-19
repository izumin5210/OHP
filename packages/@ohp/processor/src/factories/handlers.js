// @flow
import { createHandler as createPageHandler } from 'remark-newpage-directive'
import { createHandler as createPageNumberHandler } from 'remark-insert-page-number'

const handlers = {
  page: createPageHandler('page'),
  pageNumber: createPageNumberHandler('pageNumber'),
}

export default handlers
