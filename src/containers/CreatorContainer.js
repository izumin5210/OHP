// @flow
import { PureComponent } from 'react'

import { View } from 'components/creator'

import EditorContainer from './EditorContainer'
import PreviewContainer from './PreviewContainer'

type Props = {
}

export default class CreatorContainer extends PureComponent<void, Props, void> {
  render () {
    return (
      <View>
        <EditorContainer />
        <PreviewContainer />
      </View>
    )
  }
}
