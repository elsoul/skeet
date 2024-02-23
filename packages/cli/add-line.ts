import { appendFile, readFile, writeFile } from 'fs/promises'

const writer = (file: string) => {
  try {
    const currentFile = readFile(file)
    const currentFileString = String(currentFile)
    writeFile(file, '#!/usr/bin/env node\n', { flag: 'w' })
    appendFile(file, currentFileString)
  } catch (e) {
    console.log(e)
  }
}

writer('./dist/index.js')
