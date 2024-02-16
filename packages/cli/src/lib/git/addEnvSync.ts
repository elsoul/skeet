import readline from 'readline'
import { addEnv } from './addEnv'
import { createReadStream } from 'fs'

export const addEnvSync = async (filePath: string) => {
  const stream = createReadStream(filePath)
  const rl = readline.createInterface({
    input: stream,
    output: process.stdout,
    terminal: false,
  })
  rl.on('line', async (line) => {
    const key_and_value = line.match(/([A-Z_]+)="?([^"]*)"?/)
    if (key_and_value) {
      const envKey = key_and_value[1].replace(/\r?\n/g, '')
      const envValue = key_and_value[2].replace(/\r?\n/g, '')
      await addEnv(envKey, envValue)
    }
  })
}
