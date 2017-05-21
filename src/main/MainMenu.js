// @flow
import EventEmitter from 'events'

import type { BrowserWindow, MenuItem, MenuItemOptions } from 'electron'

import { events } from './constants'

const isDarwin = process.platform === 'darwin'

export default class MainMenu extends EventEmitter {
  static SEPARATOR = { type: 'separator' }

  constructor (appName: string) {
    super()
    this.appName = appName
  }

  appName: string

  get template (): Array<MenuItemOptions> {
    return [
      {
        label: this.appName,
        submenu: this.appSubmenuTemplate,
        enabled: isDarwin,
      },
      {
        label: 'File',
        submenu: this.fileSubmenuTemplate,
      },
      {
        label: 'Edit',
        submenu: this.editSubmenuTemplate,
      },
      {
        label: 'View',
        submenu: this.viewSubmenuTemplate,
      },
      {
        label: 'Window',
        role: 'window',
        submenu: this.windowSubmenuTemplate,
      },
      {
        label: 'Help',
        role: 'help',
        submenu: this.helpSubmenuTemplate,
      },
      // TODO: Add update menu items to app menu for darwin
    ]
  }

  get fileSubmenuTemplate (): Array<MenuItemOptions> {
    return [
      {
        label: 'New file',
        accelerator: 'CmdOrCtrl+N',
        click: this.clickHandler(events.openNewFile),
      },
      MainMenu.SEPARATOR,
      {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click: this.clickHandler(events.openExistingFile),
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: this.clickHandler(events.saveFile),
      },
      {
        label: 'Save As...',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: this.clickHandler(events.saveAs),
      },
      MainMenu.SEPARATOR,
      {
        label: 'Export slides as PDF',
        accelerator: 'CmdOrCtrl+Shift+E',
        click: this.clickHandler(events.exportPdf),
      },
    ]
  }

  get editSubmenuTemplate (): Array<MenuItemOptions> {
    return [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
      },
      MainMenu.SEPARATOR,
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall',
      },
    ]
  }

  get viewSubmenuTemplate (): Array<MenuItemOptions> {
    return [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (item: MenuItem, focusedWindow: BrowserWindow) => {
          if (focusedWindow) {
            focusedWindow.reload()
          }
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: isDarwin ? 'Ctrl+Command+F' : 'F11',
        click: this.clickHandler(events.toggleFullScreen),
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: isDarwin ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        // enabled: process.env.NODE_ENV !== 'production',
        click: (item: MenuItem, focusedWindow: BrowserWindow) => {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools()
          }
        },
      },
    ]
  }

  get windowSubmenuTemplate (): Array<MenuItemOptions> {
    return [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
      Object.assign({}, MainMenu.SEPARATOR, { enable: isDarwin }),
      {
        label: 'Bring All to Front',
        role: 'front',
        enabled: isDarwin,
      },
    ]
  }

  get helpSubmenuTemplate (): Array<MenuItemOptions> {
    return [
      {
        label: 'Learn More',
        click: this.clickHandler(events.openLearnMore),
      },
    ]
  }

  get appSubmenuTemplate (): Array<MenuItemOptions> {
    return [
      {
        label: `About ${this.appName}`,
        role: 'about',
      },
      MainMenu.SEPARATOR,
      {
        label: 'Services',
        role: 'services',
        submenu: [],
      },
      MainMenu.SEPARATOR,
      {
        label: `Hide ${this.appName}`,
        accelerator: 'Command+H',
        role: 'hide',
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers',
      },
      {
        label: 'Show All',
        role: 'unhide',
      },
      MainMenu.SEPARATOR,
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: this.clickHandler(events.quit),
      },
    ]
  }

  clickHandler (event: string): () => void {
    return () => { this.emit(event) }
  }
}
