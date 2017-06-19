// @flow
import 'main/setup'

import { app, Menu, ipcMain } from 'electron'

import type { KeyboardHandler } from 'types'
import type { DocumentConfig } from 'entities/Document'

import { WindowManager, MainWindow } from './windows'
import MainMenu from './MainMenu'
import { events } from './constants'
import DocumentOpener from './services/DocumentOpener'
import DocumentWriter from './services/DocumentWriter'
import PdfWriter from './services/PdfWriter'
import * as dialog from './services/dialog'

import * as channels from '../settings/ipc'

const windowManager = new WindowManager()
let mainMenu

function setMainMenu (mainMenu: MainMenu) {
  const menu = Menu.buildFromTemplate(mainMenu.template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', async () => {
  if (process.env.NODE_ENV !== 'development') {
    const install = () => {
      const {
        default: installer,
        REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, REACT_PERF,
      } = require('electron-devtools-installer')
      const extensions = [
        REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, REACT_PERF,
      ]

      return Promise.all(extensions.map(ext => installer(ext, true)))
        .catch(console.log)
    }
    await install()
  }

  windowManager.set(MainWindow.create())
  mainMenu = new MainMenu(app.getName())
  setMainMenu(mainMenu)

  mainMenu.on(events.openNewFile, () => {
    console.log('open new file')
  })

  mainMenu.on(events.openExistingFile, async () => {
    try {
      const opener = await DocumentOpener.execute()
      const { filePath, body } = opener
      windowManager.set(MainWindow.createWithDocument({ url: filePath, body }))
    } catch (e) {
      console.log(e)
    }
  })

  mainMenu.on(events.saveFile, () => {
    windowManager.getFocusedWindow().send(channels.entities.document.save, { new: false })
  })

  mainMenu.on(events.saveAs, () => {
    windowManager.getFocusedWindow().send(channels.entities.document.save, { new: true })
  })

  mainMenu.on(events.exportPdf, () => {
    windowManager.getFocusedWindow().send(channels.exportAsPdf.prepare)
  })

  mainMenu.on(events.setKeyboardHandler, (handler: KeyboardHandler) => {
    windowManager.getFocusedWindow().send(channels.editor.setKeyboardHandler, { handler })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  windowManager.forceQuit()
})

app.on('will-quit', function () {
  windowManager.onQuit()
})

app.on('activate', () => {
  windowManager.getFocusedWindow().show()
})

ipcMain.on(channels.entities.document.save, async (_e, doc: DocumentConfig, opts: { new: boolean }) => {
  const win = windowManager.getFocusedWindow()
  try {
    const { url } = await DocumentWriter.execute(win, doc, opts)
    win.send(channels.entities.document.beSaved, { url })
  } catch (e) {
    console.log(e)
  }
})

ipcMain.on(channels.exportAsPdf.start, async (event, args) => {
  try {
    const srcContents = event.sender
    const srcWin = windowManager.fromWebContents(srcContents)
    const options = {
      title: 'Export to PDF...',
      filters: [{ name: 'PDF file', extensions: ['pdf'] }],
    }
    const filename = await dialog.showSaveDialog({ window: srcWin, options })
    await PdfWriter.execute(srcContents, filename)
  } catch (e) {
    console.log(e)
  }
  event.sender.send(channels.exportAsPdf.complete)
})

ipcMain.on(channels.editor.setKeyboardHandler, (_e, handler: KeyboardHandler) => {
  mainMenu.keyboardHandler = handler
  setMainMenu(mainMenu)
})
