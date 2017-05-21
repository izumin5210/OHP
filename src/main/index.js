// @flow
import { app, BrowserWindow, Menu, ipcMain } from 'electron'

import type { KeyboardHandler } from 'types'
import type { DocumentConfig } from 'entities/Document'

import { MainWindow } from './windows'
import MainMenu from './MainMenu'
import { events } from './constants'
import DocumentOpener from './services/DocumentOpener'
import DocumentWriter from './services/DocumentWriter'
import PdfWriter from './services/PdfWriter'
import * as dialog from './services/dialog'

import * as channels from '../settings/ipc'

if (process.env.NODE_ENV !== 'production') {
  global.assert = require('power-assert')
}

let win
let mainMenu

function createWindow () {
  win = MainWindow.create()
}

function getFocusedWindow (): BrowserWindow {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow != null) {
    return focusedWindow
  }
  throw new Error()
}

function setMainMenu (mainMenu: MainMenu) {
  const menu = Menu.buildFromTemplate(mainMenu.template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
  createWindow()
  mainMenu = new MainMenu(app.getName())
  setMainMenu(mainMenu)

  mainMenu.on(events.openNewFile, () => {
    console.log('open new file')
  })

  mainMenu.on(events.openExistingFile, async () => {
    try {
      const opener = await DocumentOpener.execute()
      const { filePath, body } = opener
      win.send(channels.entities.document.open, { url: filePath, body })
    } catch (e) {
      console.log(e)
    }
  })

  mainMenu.on(events.saveFile, () => {
    getFocusedWindow().webContents.send(channels.entities.document.save, { new: false })
  })

  mainMenu.on(events.saveAs, () => {
    getFocusedWindow().webContents.send(channels.entities.document.save, { new: true })
  })

  mainMenu.on(events.exportPdf, () => {
    getFocusedWindow().webContents.send(channels.exportAsPdf.prepare)
  })

  mainMenu.on(events.setKeyboardHandler, (handler: KeyboardHandler) => {
    getFocusedWindow().webContents.send(channels.editor.setKeyboardHandler, { handler })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on(channels.entities.document.save, async (_e, doc: DocumentConfig, opts: { new: boolean }) => {
  assert(win.win != null)
  if (win.win == null) {
    return
  }
  try {
    const { url } = await DocumentWriter.execute(win.win, doc, opts)
    getFocusedWindow().webContents.send(channels.entities.document.beSaved, { url })
  } catch (e) {
    console.log(e)
  }
})

ipcMain.on(channels.exportAsPdf.start, async (event, args) => {
  try {
    const srcContents = event.sender
    const srcWin = BrowserWindow.fromWebContents(srcContents)
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
