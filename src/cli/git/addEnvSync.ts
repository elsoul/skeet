import fs from 'fs'
import readline from 'readline'
import { addEnv } from './addEnv'

export const addEnvSync = async (filePath: string) => {
  const stream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: stream,
    output: process.stdout,
    terminal: false,
  })
  rl.on('line', async (line) => {
    let key_and_value = line.match(/([A-Z_]+)="?([^"]*)"?/)
    if (key_and_value) {
      let envKey = key_and_value[1].replace(/\r?\n/g, '')
      let envValue = key_and_value[2].replace(/\r?\n/g, '')
      await addEnv(envKey, envValue)
    }
  })
}
