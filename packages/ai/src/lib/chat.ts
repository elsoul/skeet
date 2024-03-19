import { ConfigGeminiType, defaultGeminiConfig, geminiChat } from './geminiChat'
import { AIType, InputOutput, generatePrompt } from './genPrompt'
import { ConfigOpenAIType, defaultOpenAIConfig, openAIChat } from './openAIChat'
import { readGeminiStream } from './readGeminiStream'
import { readOpenAIStream } from './readOpenAIStream'
import { Readable } from 'stream'
import { StreamGenerateContentResult } from '@google-cloud/vertexai'
import OpenAI from 'openai'
import { geminiChatStream } from './geminiChatStream'
import { openAIChatStream } from './openAIChatStream'
import { Content } from './types/vertexAiResponseTypes'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import { claudeChatStream } from './claudeChatStream'
import { claudeChat } from './claudeChat'
import { readClaudeStream } from './readClaudeStream'

const GEMINI = 'Gemini'
const OPENAI = 'OpenAI'
const CLAUDE = 'Claude'

/**
 * Asynchronously communicates with a chat model to generate a response based on the provided context, examples, and input.
 * It supports interaction with Gemini, OpenAI, or Claude models based on the `aiType` parameter.
 *
 * @param context - A string providing context or background information for the chat model to consider.
 * @param examples - An array of `InputOutput` objects representing example input-output pairs to guide the model's responses.
 * @param input - The user's input string for which a response is requested from the chat model.
 * @param aiType - Specifies the chat model to use. Defaults to 'Gemini'. Can be either 'Gemini', 'OpenAI' or 'Claude'.
 * @param isStream - A boolean indicating whether to return a stream of the model's response. Defaults to true.
 * @param isLogging - A boolean indicating whether to log the stream's content to the console. Defaults to true.
 * @returns Returns a Promise resolving to a stream of the model's response. If logging is disabled, the raw stream is returned directly.
 * @throws Exits the process with status code 1 if an error occurs.
 *
 * @example
 * import { chat } from '@skeet-framework/ai'
 *
 * const examples = [
 *  { input: "Who was the first person in space?", output: "Yuri Gagarin" },
 * { input: "Tell me about the Apollo missions.", output: "Gemini" }
 * ]
 * const aiType = 'Gemini'
 * const context = "Space missions are a series of manned and unmanned missions to explore outer space."
 * const input = "Tell me about space missions."
 * const stream = await chat(context, examples, input, aiType)
 **/

export const chat = async (
  context: string,
  examples: InputOutput[],
  input: string,
  aiType = GEMINI as AIType,
  isStream = true,
  isLogging = true,
) => {
  if (aiType === GEMINI) {
    try {
      const geminiConfig: ConfigGeminiType = {
        model: defaultGeminiConfig.model,
        project: process.env.GCP_PROJECT_ID || '',
        location: process.env.GCP_LOCATION || '',
      }
      const contents = generatePrompt<typeof GEMINI>(
        GEMINI,
        context,
        examples,
        input,
      ) as Content[]

      if (isStream) {
        const stream = await geminiChatStream(contents, geminiConfig)
        if (!isLogging) {
          return stream as StreamGenerateContentResult
        }
        await readGeminiStream(stream as StreamGenerateContentResult)
        return stream as StreamGenerateContentResult
      }
      const resp = await geminiChat(contents, geminiConfig)
      return resp
    } catch (error) {
      console.error('Error:', error)
      process.exit(1)
    }
  } else if (aiType === OPENAI) {
    try {
      const openaiConfig: ConfigOpenAIType = {
        model: defaultOpenAIConfig.model,
        maxTokens: defaultOpenAIConfig.maxTokens,
        temperature: defaultOpenAIConfig.temperature,
        topP: defaultOpenAIConfig.topP,
        n: defaultOpenAIConfig.n,
        stream: true,
        organizationKey: process.env.CHAT_GPT_ORG || '',
        apiKey: process.env.CHAT_GPT_KEY || '',
      }
      const prompt = generatePrompt<typeof OPENAI>(
        OPENAI,
        context,
        examples,
        input,
      ) as OpenAI.Chat.Completions.ChatCompletionMessageParam[]

      if (isStream) {
        const stream = await openAIChatStream(prompt, openaiConfig)
        if (!isLogging) {
          return stream
        }
        await readOpenAIStream(stream as unknown as Readable)
      }
      const resp = await openAIChat(prompt, openaiConfig)
      return resp
    } catch (error) {
      console.error('Error:', error)
      process.exit(1)
    }
  } else if (aiType === CLAUDE) {
    try {
      const prompt = generatePrompt<typeof CLAUDE>(
        CLAUDE,
        context,
        examples,
        input,
      ) as MessageParam[]
      if (isStream) {
        const stream = await claudeChatStream(prompt)
        if (!isLogging) {
          return stream
        }
        await readClaudeStream(stream)
        return stream
      }
      const resp = await claudeChat(prompt)
      return resp
    } catch (error) {
      console.error('Error:', error)
      process.exit(1)
    }
  }
}
