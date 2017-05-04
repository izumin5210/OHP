// @flow
import { PureComponent } from 'react'
import remark from 'remark'
import remarkRenderer from 'remark-react'

type Props = {
  body: string,
}

export default class PreviewContainer extends PureComponent<void, Props, void> {
  // for lint
  props: Props

  render () {
    return (
      <div>
        { remark().use(remarkRenderer).processSync(this.props.body).contents }
      </div>
    )
  }
}
