// @flow
import factory from './factory'
import { forBody, forOutline } from './plugins'

import sanitize from './sanitize'
import handlers from './handlers'

export const optionsByPluginName = {
  newpageDirective: {
    withPosition: true,
  },
  react: {
    sanitize,
    toHast: {
      handlers,
    },
  },
}

export const bodyToReactFactory = factory(forBody, optionsByPluginName)
export const outlineToReactFactory = factory(forOutline, optionsByPluginName)
