import { Stream } from 'stream'
import { promptUser } from './ai'
import chalk from 'chalk'
import { SkeetAIOptions } from '@skeet-framework/ai'

export const vertexStream = (
  stream: Stream,
  skeetAIOptions: SkeetAIOptions
) => {
  let bufferedResponse = ''
  stream.on('data', (chunk) => {
    bufferedResponse += chunk.toString()

    let separatorIndex
    while ((separatorIndex = bufferedResponse.indexOf('\n')) >= 0) {
      const messagePart = bufferedResponse.slice(0, separatorIndex).trim()
      console.log(chalk.white(messagePart))

      bufferedResponse = bufferedResponse.slice(separatorIndex + 1)
    }
  })

  stream.on('end', () => {
    if (bufferedResponse) {
      console.log(chalk.white(bufferedResponse.trim()))
    }
    promptUser(skeetAIOptions)
  })
}
