// @flow
import { PureComponent } from 'react'

import Panes from 'components/common/Panes'

import Layout from './Layout'
import Editor from 'components/editor'
import Outline from 'components/outline'
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
          <Panes
            split='vertical'
            primary='second'
            minSize={30}
            defaultSize='70%'
          >
            <Outline />
            <Editor />
          </Panes>
          <PreviewContainer />
        </Panes>
      </Layout>
    )
  }
}
