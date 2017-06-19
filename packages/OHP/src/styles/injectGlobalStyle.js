// @flow
import { injectGlobal } from 'styled-components'
import normalizeCss from 'styles/vendor/normalize.css/normalize.css.js'

export default function injectGlobalStyle () {
  injectGlobal`${normalizeCss}`
  injectGlobal`
    html {
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", "Noto Sans Japanese", "ヒラギノ角ゴ ProN W3", Meiryo, sans-serif;
    }
  `
}
