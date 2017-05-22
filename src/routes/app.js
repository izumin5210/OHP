/* @flow */
import { Route, Switch } from 'react-router'

import App from 'components/App'
import Print from 'components/print'

type RouteDefinition = {
  component: ReactClass<*>,
  path: string,
  exact?: boolean,
}

const defs: { [string]: RouteDefinition } = {
  'app#index': {
    component: App,
    path: '/',
    exact: true,
  },
  'document#show': {
    component: Print,
    path: '/print',
  },
}

export function getPathFromKey (key: $Keys<typeof defs>): string {
  const route = defs[key]
  if (route == null) {
    throw new Error()
  }
  return route.path
}

export default (
  <Switch>
    { Object.keys(defs).map(key => (<Route key={key} {...defs[key]} />)) }
  </Switch>
)
