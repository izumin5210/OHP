// @flow
const { app, Menu } = require('electron')
const { MainWindow } = require('./windows')

let win

function createWindow () {
  win = MainWindow.create()
}

app.on('ready', createWindow)

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
