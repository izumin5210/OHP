// @flow
import { PureComponent } from 'react'

import Panes from 'components/common/Panes'

import EditorContainer from './EditorContainer'
import PreviewContainer from './PreviewContainer'

type Props = {
}

export default class CreatorContainer extends PureComponent<void, Props, void> {
  render () {
    return (
      <Panes
        split='vertical'
        defaultSize='50%'
      >
        <EditorContainer />
        <PreviewContainer />
      </Panes>
    )
  }
}
