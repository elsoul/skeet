import { appendFile, readFile, writeFile } from 'node:fs/promises'

const writer = async (file: string) => {
  try {
    const currentFile = await readFile(file)
    const currentFileString = String(currentFile)
    await writeFile(file, '#!/usr/bin/env node\n', { flag: 'w' })
    await appendFile(file, currentFileString)
  } catch (e) {
    console.log(e)
  }
}

const run = async () => {
  await writer('./dist/index.js')
}

void run()
