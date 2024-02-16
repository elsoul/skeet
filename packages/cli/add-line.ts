import fs from 'fs/promises'

const writer = async (file: string) => {
  try {
    const currentFile = await fs.readFile(file)
    const currentFileString = String(currentFile)
    await fs.writeFile(file, '#!/usr/bin/env node\n', { flag: 'w' })
    await fs.appendFile(file, currentFileString)
  } catch (e) {
    console.log(e)
  }
}

writer('./dist/index.js')
