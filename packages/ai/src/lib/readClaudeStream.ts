import chalk from 'chalk'
import { MessageStreamEvent } from '@anthropic-ai/sdk/resources'
import { Stream } from '@anthropic-ai/sdk/streaming'

export const readClaudeStream = async (
  streamingResp: Stream<MessageStreamEvent>,
) => {
  for await (const item of streamingResp) {
    const text = JSON.parse(JSON.stringify(item))
    process.stdout.write(chalk.white(text.delta?.text))
  }
  // ストリームの終了後、改行を出力して区切ります
  process.stdout.write('\n')
  return true
}
