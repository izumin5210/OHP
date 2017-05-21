// @flow
import Window from './Window'
import { mainWindowUrl } from '../constants'

export default class MainWindow extends Window {
  static url = mainWindowUrl

  static create (): MainWindow {
    const win = new MainWindow({ width: 1024, height: 768 })
    win.create()
    return win
  }

  get url (): string {
    return MainWindow.url
  }
}
