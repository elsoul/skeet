import Anthropic from '@anthropic-ai/sdk'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import dotenv from 'dotenv'
dotenv.config()

export const defaultClaudeConfig = {
  max_tokens: 1024,
  top_p: 1,
  top_k: 40,
  model: 'claude-3-opus-20240229',
}

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''

// defaults to process.env["ANTHROPIC_API_KEY"]
export const claudeChat = async (
  messages: MessageParam[],
  config = defaultClaudeConfig,
) => {
  try {
    if (ANTHROPIC_API_KEY === '') {
      console.error('ANTHROPIC_API_KEY is required in .env file.')
      process.exit(1)
    }
    const anthropic = new Anthropic()
    const body: Anthropic.Messages.MessageCreateParams = {
      ...config,
      messages,
    }

    const msg = await anthropic.messages.create(body)
    return msg.content[0].text as string
  } catch (error) {
    throw new Error(`Error in claudeChat: ${error}`)
  }
}
