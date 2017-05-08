// @flow
import type { WebContents } from 'electron'

const fs = require('fs')

class PdfWriter {
  static async execute (contents: WebContents, filename: string): Promise<PdfWriter> {
    const writer = new PdfWriter(contents)
    await writer.execute(filename)
    return writer
  }

  constructor (contents: WebContents) {
    this.contents = contents
  }

  contents: WebContents

  async execute (filename: string): Promise<void> {
    const data = await this.loadData()
    this.write(filename, data)
  }

  write (filename: string, data: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, (err) => {
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
        } else if (data == null) {
          // TODO: should use custom error
          reject(new Error())
        } else {
          resolve(data)
        }
      })
    })
  }
}

module.exports = PdfWriter
