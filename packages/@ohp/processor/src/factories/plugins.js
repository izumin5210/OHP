// @flow
import react from 'remark-react'
import meta from 'remark-yaml-meta'
import extractStyles from 'remark-extract-styles'
import newpageDirective from 'remark-newpage-directive'
import insertPageNumber from 'remark-insert-page-number'
import pageNumberDirective from 'remark-page-number-directive'
import pagePropsDirective from 'remark-page-props-directive'
import outline from 'remark-outline'
import listDepthAnnotation from 'remark-list-depth-annotation'

export const forBody = {
  meta,
  extractStyles,
  newpageDirective,
  insertPageNumber,
  pagePropsDirective,
  pageNumberDirective,
  react,
}

export const forOutline = {
  outline,
  listDepthAnnotation,
  react,
}
