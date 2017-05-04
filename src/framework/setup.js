// @flow
import React from 'react'

global.React = React

if (global.Promise == null) {
  global.Promise = Promise
}
