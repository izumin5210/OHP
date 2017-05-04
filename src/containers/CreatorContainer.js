// @flow
import { PureComponent } from 'react'

import { View } from 'components/creator'

import EditorContainer from './EditorContainer'
import PreviewContainer from './PreviewContainer'

type Props = {
}

type State = {
  body: string,
}

export default class CreatorContainer extends PureComponent<void, Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      body: '',
    }
  }

  state: State

  onBodyChange = (body: string) => {
    this.setState({ body })
  }

  render () {
    const { body } = this.state
    return (
      <View>
        <EditorContainer
          {...{ body }}
          onBodyChange={this.onBodyChange}
        />
        <PreviewContainer {...{ body }} />
      </View>
    )
  }
}
