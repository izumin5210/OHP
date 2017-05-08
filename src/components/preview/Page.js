// @flow
import { PureComponent } from 'react'
import ShadowDom from 'react-shadow'

import type { Children, Element } from 'react'

import styles from './Page.css'

type Props = {
  width: number,
  exportingAsPdf: boolean,
  userStyles: Array<string>,
  children?: Children,
}

export default class Page extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  get width (): number {
    // FIXME
    const { width, exportingAsPdf } = this.props
    return exportingAsPdf ? 1024 : width
  }

  get height (): number {
    // TODO: tweak slide acpect ratio
    return 0.75 * this.width
  }

  get fontSize (): number {
    // TODO: tweak base font-size
    return 36 * (this.width / 800)
  }

  get style (): Object {
    const { exportingAsPdf } = this.props
    const { width, height, fontSize } = this
    return Object.assign(
      {},
      {
        height,
        minHeight: height,
        maxHeight: height,
        fontSize,
      },
      exportingAsPdf ? { width } : {},
    )
  }

  get userStyles (): Array<Element<*>> {
    return this.props.userStyles.map((style, i) => (
      <style type='text/css' key={`userStyle[${i}]`}>{ style }</style>
    ))
  }

  render () {
    return (
      <ShadowDom>
        <section
          className={styles.page}
          style={this.style}
        >
          { this.props.children }
          { this.userStyles }
        </section>
      </ShadowDom>
    )
  }
}
