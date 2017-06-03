// @flow
import reducer, { RootState } from 'store/modules'
import configureStore from 'store/configure'
import * as DocumentActions from 'store/modules/entities/document'

import Window from './Window'
import { mainWindowUrl } from '../constants'

export type CreateOptions = {
  initialState?: Object,
  width?: number,
  height?: number,
}

export default class MainWindow extends Window {
  static url = mainWindowUrl
  static defaultCreateOption= {
    initialState: {},
    width: 1024,
    height: 768,
  }

  static createWithDocument (params: { url: string, body: string }): MainWindow {
    const store = configureStore(reducer, new RootState())
    store.dispatch(DocumentActions.open(params))
    return this.create({ initialState: store.getState().toJS() })
  }

  static create (
    {
      initialState = MainWindow.defaultCreateOption.initialState,
      width = MainWindow.defaultCreateOption.width,
      height = MainWindow.defaultCreateOption.height,
    }: CreateOptions = MainWindow.defaultCreateOption,
  ): MainWindow {
    const win = new MainWindow({ width, height })
    win.create(initialState)
    return win
  }

  get url (): string {
    return MainWindow.url
  }
}
