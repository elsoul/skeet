import OpenAI from 'openai'
import {
  ChatCompletionChunk,
  ChatCompletionCreateParamsBase,
  ChatCompletionMessageParam,
} from 'openai/resources/chat/completions'
import { Stream } from 'openai/streaming'
import dotenv from 'dotenv'
import { defaultOpenAIConfig } from './openAIChat'
dotenv.config()

const apiKey = process.env.CHAT_GPT_KEY || ''
const organizationKey = process.env.CHAT_GPT_ORG || ''

export const openAIChatStream = async (
  contents: Array<ChatCompletionMessageParam>,
  config = defaultOpenAIConfig,
) => {
  if (config.organizationKey === '' || config.apiKey === '') {
    console.error(
      'CHAT_GPT_ORG and CHAT_GPT_KEY are required in .env file.\n\nor you can pass them as arguments to the function.',
    )
    process.exit(1)
  }

  const ai = new OpenAI({
    apiKey,
    organization: organizationKey,
  })
  const openaiConfig: ChatCompletionCreateParamsBase = {
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    top_p: config.topP,
    n: config.n,
    stream: true,
    messages: contents,
  }
  const stream = (await ai.chat.completions.create(
    openaiConfig,
  )) as Stream<ChatCompletionChunk>
  return stream
}
