import { Readable } from 'stream'
import chalk from 'chalk'

export const readOpenAIStream = async (characterStream: Readable) => {
  for await (const chunk of characterStream) {
    if (typeof chunk === 'object' && chunk !== null) {
      if (
        chunk.choices &&
        chunk.choices.length > 0 &&
        chunk.choices[0].delta?.content
      ) {
        const text = chunk.choices[0].delta.content
        process.stdout.write(chalk.white(text))
      }
    } else {
      process.stdout.write(chalk.white(chunk.toString()))
    }
  }
}
