// @flow
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools((
  <DockMonitor
    changePositionKey='ctrl-w'
    toggleVisibilityKey='ctrl-h'
    defaultIsVisible={false}
  >
    <LogMonitor />
  </DockMonitor>
))
