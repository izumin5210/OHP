// @flow
import type { Reducer } from 'redux'

export default function wrapStateWith<S> (
  StateClass: Class<S>,
  reducer: Reducer<S, any>,
  initialState: S,
): Reducer<S, any> {
  return function (state: S = initialState, action: any) {
    if (!(state instanceof StateClass)) {
      // $FlowFixMe
      return new StateClass(state)
    }
    return reducer(state, action)
  }
}
