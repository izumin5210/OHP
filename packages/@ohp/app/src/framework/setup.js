// @flow
import React from 'react'

global.React = React

if (process.env.NODE_ENV !== 'production') {
  global.assert = require('power-assert')
  global.Perf = require('react-addons-perf')
}

if (global.Promise == null) {
  global.Promise = Promise
}
