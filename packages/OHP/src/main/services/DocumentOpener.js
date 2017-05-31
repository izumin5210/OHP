// @flow
import fs from 'fs'

import * as dialog from './dialog'

export default class DocumentOpener {
  static async execute (): Promise<DocumentOpener> {
    const opener = new DocumentOpener()
    await opener.execute()
    return opener
  }

  async execute (): Promise<void> {
    this.filePath = await this.chooseFile()
    this.body = await this.readFile(this.filePath)
  }

  filePath: string
  body: string

  async chooseFile (): Promise<string> {
    const options = {
      filters: [
        // https://github.com/github/linguist/blob/5e2c79e9501d7cd2ecbea9afce64734dd4e4196f/lib/linguist/languages.yml#L2479-L2485
        { name: 'Markdown', extensions: ['md', 'markdown', 'mdown', 'mkd', 'mkdn', 'mkdown'] },
      ],
      properties: ['openFile'],
    }
    const filePaths = await dialog.showOpenDialog({ options })
    assert(filePaths.length === 1)
    return filePaths[0]
  }

  async readFile (filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const cb = (err, data) => {
        if (err != null) {
          reject(err)
        } else {
          resolve(data)
        }
      }
      fs.readFile(filePath, 'utf8', cb)
    })
  }
}
