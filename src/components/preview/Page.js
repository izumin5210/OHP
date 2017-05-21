// @flow
import { PureComponent } from 'react'
import ShadowDom from 'react-shadow'

import type { Children, Element } from 'react'

import { default as highlightDefault } from 'settings/highlightStyles'

import PageWrapper from './PageWrapper'

type Props = {
  className: string,
  fontSize: number,
  width: number,
  exportingAsPdf: boolean,
  userStyles: Array<string>,
  children?: Children,
}

export default class Page extends PureComponent<void, Props, void> {
  static wrapperStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }

  // for lint
  props: Props

  get userStyles (): Array<Element<*>> {
    return this.props.userStyles.map((style, i) => (
      <style type='text/css' key={`userStyle[${i}]`}>{ style }</style>
    ))
  }

  render () {
    return (
      <PageWrapper
        screenWidth={this.props.width}
        baseFontSize={this.props.fontSize}
        exporting={this.props.exportingAsPdf}
      >
        <ShadowDom nodeName='div'>
          <div style={Page.wrapperStyle}>
            <div
              className={this.props.className}
              style={Page.wrapperStyle}
            >
              { this.props.children }
              { this.userStyles }
              <link rel='stylesheet' href={highlightDefault} />
            </div>
          </div>
        </ShadowDom>
      </PageWrapper>
    )
  }
}
