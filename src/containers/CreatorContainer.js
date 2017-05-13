// @flow
import { PureComponent } from 'react'

import Panes from 'components/common/Panes'

import Layout from './Layout'
import EditorContainer from './EditorContainer'
import PreviewContainer from './PreviewContainer'

type Props = {
}

export default class CreatorContainer extends PureComponent<void, Props, void> {
  render () {
    return (
      <Layout>
        <Panes
          split='vertical'
          defaultSize='60%'
          pane2Style={{ overflowY: 'scroll' }}
        >
          <EditorContainer />
          <PreviewContainer />
        </Panes>
      </Layout>
    )
  }
}
