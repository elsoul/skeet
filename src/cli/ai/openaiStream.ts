import { promptUser } from './ai'
import chalk from 'chalk'
import { ReadStream } from 'fs'

export const openaiStream = (openaiStream: any) => {
  let bufferedResponse = ''
  const stream = ReadStream.from(openaiStream)
  stream.on('data', (chunk) => {
    bufferedResponse += chunk.choices[0].delta.content.toString()

    let separatorIndex
    while ((separatorIndex = bufferedResponse.indexOf('\n')) >= 0) {
      const messagePart = bufferedResponse.slice(0, separatorIndex).trim()
      console.log(chalk.white(messagePart))

      bufferedResponse = bufferedResponse.slice(separatorIndex + 1)
    }
  })
  stream.on('end', () => {
    if (bufferedResponse) {
      console.log(chalk.white(bufferedResponse))
    }
    promptUser({
      ai: 'OpenAI',
    })
  })
}

function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}
