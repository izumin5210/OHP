/* @flow */
import { PureComponent, Children } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import type { Connector } from 'react-redux'

import { defaultTitle, editedSuffix } from 'settings/constants'
import { getUrl, isSaved } from 'store/selectors/entities/document'

import type { RootState } from 'store/modules'

type RequiredProps = {
  children?: Children,
}

type InjectedProps = {
  url: string,
  saved: boolean,
}

type Props = RequiredProps & InjectedProps

const connector: Connector<RequiredProps, Props> = connect(
  (state: RootState) => ({
    url: getUrl(state),
    saved: isSaved(state),
  }),
)

class Layout extends PureComponent<void, Props, void> {
  get title (): string {
    const { url, saved } = this.props
    const title = url.length === 0 ? defaultTitle : url
    return saved ? title : `${title} ${editedSuffix}`
  }

  // for lint
  props: Props

  render () {
    const { children } = this.props

    return (
      <div className='Layout'>
        <Helmet>
          <title>{ this.title }</title>
        </Helmet>
        { children }
      </div>
    )
  }
}

export default connector(Layout)
