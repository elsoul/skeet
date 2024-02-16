import { Stream } from 'stream'
import { promptUser } from './ai'
import chalk from 'chalk'
import { SkeetAIOptions } from '@skeet-framework/ai'
import { SkeetAiMode, SkeetRole } from '@/types/skeetTypes'
import { AiLog } from './aiLog'

export const vertexStream = (
  stream: Stream,
  skeetAIOptions: SkeetAIOptions,
  logger: AiLog
) => {
  let bufferedResponse = ''
  const messages: string[] = []
  stream.on('data', (chunk) => {
    bufferedResponse += chunk.toString()

    let separatorIndex
    while ((separatorIndex = bufferedResponse.indexOf('\n')) >= 0) {
      const messagePart = bufferedResponse.slice(0, separatorIndex).trim()
      if (messagePart) {
        messages.push(messagePart)
      }
      console.log(chalk.white(messagePart))

      bufferedResponse = bufferedResponse.slice(separatorIndex + 1)
    }
  })

  stream.on('end', () => {
    if (bufferedResponse) {
      messages.push(bufferedResponse.trim())
      console.log(chalk.white(bufferedResponse.trim()))
    }
    logger.addJson(
      SkeetRole.AI,
      messages.join(''),
      SkeetAiMode.Skeet,
      skeetAIOptions.model || ''
    )

    promptUser(skeetAIOptions, logger)
  })
}
