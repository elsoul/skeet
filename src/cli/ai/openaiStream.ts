import { ChatCompletionChunk, Stream } from '@skeet-framework/ai'
import { promptUser } from './ai'
import chalk from 'chalk'
import { ReadStream } from 'fs'
import { SkeetAIOptions } from '@skeet-framework/ai/dist/esm/lib/skeetai'

export const openaiStream = (
  openaiStream: Stream<ChatCompletionChunk>,
  skeetAIOptions: SkeetAIOptions
) => {
  let bufferedResponse = ''
  const stream = ReadStream.from(openaiStream)
  stream.on('data', (chunk) => {
    if (
      chunk.choices &&
      chunk.choices[0] &&
      chunk.choices[0].delta &&
      chunk.choices[0].delta.content
    ) {
      bufferedResponse += chunk.choices[0].delta.content.toString()

      let separatorIndex
      while ((separatorIndex = bufferedResponse.indexOf('\n')) >= 0) {
        const messagePart = bufferedResponse.slice(0, separatorIndex).trim()
        console.log(chalk.white(messagePart))

        bufferedResponse = bufferedResponse.slice(separatorIndex + 1)
      }
    }
  })
  stream.on('end', () => {
    if (bufferedResponse) {
      console.log(chalk.white(bufferedResponse))
    }
    promptUser(skeetAIOptions)
  })
}
