/* @flow */
import { Route, Switch } from 'react-router'

import CreatorContainer from 'containers/CreatorContainer'
import PreviewContainer from 'containers/PreviewContainer'

type RouteDefinition = {
  component: ReactClass<*>,
  key: string,
  path: string,
  exact?: boolean,
}

const defs: Array<RouteDefinition> = [
  {
    component: CreatorContainer,
    key: 'document#edit',
    path: '/',
    exact: true,
  },
  {
    component: PreviewContainer,
    key: 'document#show',
    path: '/preview',
  },
]

export default (
  <Switch>
    { defs.map(props => (<Route {...props} />)) }
  </Switch>
)
