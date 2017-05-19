// @flow
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import type { Dispatch } from 'redux'
import type { Action } from 'redux-actions'
import type { Connector } from 'react-redux'

import { setWidth } from 'store/modules/preview'
import { getBody } from 'store/selectors/preview'
import { SlidePreview } from 'components/preview'

import type { RootState } from 'store/modules'

type RequiredProps = {
}

type InjectedProps = {
  bodyElement: any,
  setWidth: (width: number) => any,
}

type Props = RequiredProps & InjectedProps

const connector: Connector< RequiredProps, Props> = connect(
  (state: RootState) => ({
    bodyElement: (getBody(state) || { contents: null }).contents,
  }),
  (dispatch: Dispatch<Action<any, any>>) => ({
    setWidth: debounce(
      (width: number) => dispatch(setWidth(width)),
      300,
      { maxWait: 1000 },
    )
  }),
)

class PreviewContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    const { bodyElement, setWidth } = this.props
    return (
      <SlidePreview {...{ bodyElement, setWidth }} />
    )
  }
}

export default connector(PreviewContainer)
