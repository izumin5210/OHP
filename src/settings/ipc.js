// @flow
export const exportAsPdf = {
  prepare: 'exportAsPdf:prepare',
  start: 'exportAsPdf:start',
  complete: 'exportAsPdf:complete',
}

export const editor = {
  setKeyboardHandler: 'editor:keyboardHandler:set'
}

export const entities = {
  document: {
    open: 'entities:document:open',
    save: 'entities:document:save',
    beSaved: 'entities:document:beSaved',
  },
}
