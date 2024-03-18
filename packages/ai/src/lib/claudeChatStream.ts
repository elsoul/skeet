import Anthropic from '@anthropic-ai/sdk'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import dotenv from 'dotenv'
import { defaultClaudeConfig } from './claudeChat'
dotenv.config()

// defaults to process.env["ANTHROPIC_API_KEY"]
export const claudeChatStream = async (
  messages: MessageParam[],
  config = defaultClaudeConfig,
) => {
  try {
    const anthropic = new Anthropic()
    const body: Anthropic.Messages.MessageCreateParamsStreaming = {
      ...config,
      messages,
      stream: true,
    }

    const msg = await anthropic.messages.create(body)
    return msg
  } catch (error) {
    throw new Error(`Error in claudeChat: ${error}`)
  }
}
