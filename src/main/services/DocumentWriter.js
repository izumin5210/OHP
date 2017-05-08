// @flow
import type { BrowserWindow } from 'electron'
import type { DocumentConfig } from 'entities/Document'

const fs = require('fs')
const dialog = require('./dialog')

type Options = {
  new: boolean,
}

class DocumentWriter {
  static async execute (
    win: BrowserWindow,
    doc: DocumentConfig,
    opts: Options,
  ): Promise<DocumentWriter> {
    const writer = new DocumentWriter(win)
    await writer.execute(doc, opts)
    return writer
  }

  async execute (doc: DocumentConfig, opts: Options): Promise<void> {
    this.url = doc.url
    if (opts.new == null || opts.new || this.url.length === 0) {
      this.url = await this.getFilenameFromDialog()
    }
    await this.write(this.url, doc.body)
  }

  constructor (win: BrowserWindow) {
    this.win = win
  }

  win: BrowserWindow
  url: string

  async getFilenameFromDialog (): Promise<string> {
    const options = {
      title: 'Save as...',
      // filters: [
      //   // https://github.com/github/linguist/blob/5e2c79e9501d7cd2ecbea9afce64734dd4e4196f/lib/linguist/languages.yml#L2479-L2485
      //   { name: 'Markdown', extensions: ['md', 'markdown', 'mdown', 'mkd', 'mkdn', 'mkdown'] },
      // ],
    }
    const filename = await dialog.showSaveDialog({ window: this.win, options })
    return filename
  }

  write (filename: string, body: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const cb = (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
      fs.writeFile(filename, body, { encoding: 'utf8' }, cb)
    })
  }
}

module.exports = DocumentWriter
