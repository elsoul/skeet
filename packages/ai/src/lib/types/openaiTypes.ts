import { ChatCompletionMessageParam } from 'openai/resources'

export type OpenAIPromptParams = {
  messages: ChatCompletionMessageParam[]
}

export type OpenAIOptions = {
  organizationKey?: string
  apiKey?: string
  model?: string
  temperature?: number
  maxTokens?: number
  topP?: number
  n?: number
  stream?: boolean
}

export type OpenAIRole = 'function' | 'system' | 'assistant' | 'user'

export type OpenAIMessage = {
  role: OpenAIRole
  content: string
}
