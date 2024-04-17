import OpenAI from 'openai'
import {
  ChatCompletionCreateParamsBase,
  ChatCompletionMessageParam,
} from 'openai/resources/chat/completions'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.CHAT_GPT_KEY || ''
const organizationKey = process.env.CHAT_GPT_ORG || ''

export type OpenAIModel =
  | 'gpt-4-turbo-preview'
  | 'gpt-4-vision-preview'
  | 'gpt-4-32k'
  | 'gpt-3.5-turbo-0125'
  | 'gpt-3.5-turbo'

export interface ConfigOpenAIType {
  model: OpenAIModel
  temperature: number
  maxTokens: number
  topP: number
  n: number
  stream: boolean
  organizationKey: string
  apiKey: string
}

export const defaultOpenAIConfig: ConfigOpenAIType = {
  model: 'gpt-4-turbo-preview' as OpenAIModel,
  temperature: 0,
  maxTokens: 256,
  topP: 0.95,
  n: 1,
  stream: true,
  organizationKey,
  apiKey,
}

export const openAIChat = async (
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
    apiKey: config.apiKey,
    organization: config.organizationKey,
  })
  const openaiConfig: ChatCompletionCreateParamsBase = {
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    top_p: config.topP,
    n: config.n,
    stream: false,
    messages: contents,
  }

  const resp = await ai.chat.completions.create(openaiConfig)
  if ('choices' in resp) {
    return resp.choices[0].message.content as string
  } else {
    throw new Error('Error in openAIChat: response is null')
  }
}
