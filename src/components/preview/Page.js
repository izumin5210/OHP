// @flow
import { PureComponent } from 'react'
import ShadowDom from 'react-shadow'

import type { Children, Element } from 'react'

import styles from './SlidePreview.css'

type Props = {
  width: number,
  userStyles: Array<string>,
  children?: Children,
}

export default class Page extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  get style (): Object {
    const { width } = this.props
    // TODO: tweak slide acpect ratio
    const height = 0.75 * width
    return {
      height,
      minHeight: height,
      maxHeight: height,
      // TODO: tweak base font-size
      fontSize: 36 * (width / 800)
    }
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
