import chalk from 'chalk'
import { MessageStreamEvent } from '@anthropic-ai/sdk/resources'
import { Stream } from '@anthropic-ai/sdk/streaming'

export const readClaudeStream = async (
  streamingResp: Stream<MessageStreamEvent>,
) => {
  for await (const item of streamingResp) {
    try {
      const text = JSON.parse(JSON.stringify(item))
      const msg = text.delta?.text
      if (msg != null) process.stdout.write(chalk.white(msg))
    } catch (error) {
      process.stdout.write(
        chalk.white('Something went wrong... Please try again 🙇'),
      )
      return error
    }
  }
  // ストリームの終了後、改行を出力して区切ります
  process.stdout.write('\n')
  return true
}
