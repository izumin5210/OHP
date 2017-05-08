// @flow
import type { webContents } from 'electron'

const fs = require('fs')

class PdfWriter {
  static async execute (contents: webContents): Promise<PdfWriter> {
    const writer = new PdfWriter(contents)
    await writer.execute()
    return writer
  }

  constructor (contents: webContents) {
    this.contents = contents
  }

  contents: webContents

  async execute (): Promise<void> {
    const data = await this.loadData()
    this.write(data)
  }

  write (data: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile('/tmp/print.pdf', data, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  loadData (): Promise<Buffer> {
    const opts = {
      marginsType: 1,
      pageSize: {
        width: Math.floor(1024 * 25400 / 96),
        height: Math.floor(768 * 25400 / 96),
      },
      printBackground: true,
    }
    return new Promise((resolve, reject) => {
      this.contents.printToPDF(opts, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

module.exports = PdfWriter
