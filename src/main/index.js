// @flow
const { app, BrowserWindow, Menu, ipcMain } = require('electron')

const { MainWindow } = require('./windows')
const MainMenu = require('./MainMenu')
const { events } = require('./constants')
const PdfWriter = require('./services/PdfWriter')
const dialog = require('./services/dialog')

const channels = require('../settings/ipc')

let win
let mainMenu

function createWindow () {
  win = MainWindow.create()
}

app.on('ready', () => {
  createWindow()
  mainMenu = new MainMenu(app.getName())
  const menu = Menu.buildFromTemplate(mainMenu.template)
  Menu.setApplicationMenu(menu)

  mainMenu.on(events.openNewFile, () => {
    console.log('open new file')
  })

  mainMenu.on(events.exportPdf, () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow != null) {
      focusedWindow.webContents.send(channels.exportAsPdf.prepare)
    }
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

ipcMain.on(channels.exportAsPdf.start, async (event, args) => {
  try {
    const srcContents = event.sender
    const srcWin = BrowserWindow.fromWebContents(srcContents)
    const opts = {
      title: 'Export to PDF...',
      filters: [{ name: 'PDF file', extensions: ['pdf'] }],
    }
    const filename = await dialog.showSaveDialog(srcWin, opts)
    await PdfWriter.execute(srcContents, filename)
  } catch (e) {
    console.log(e)
  }
  event.sender.send(channels.exportAsPdf.complete)
})
