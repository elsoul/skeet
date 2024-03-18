import { ChatCompletionMessageParam } from 'openai/resources'
import { Content } from '@google-cloud/vertexai'
import { MessageParam } from '@anthropic-ai/sdk/resources'

/**
 * Represents the AI platforms supported by the generatePrompt function.
 */
export type AIType = 'Gemini' | 'OpenAI' | 'Claude'

/**
 * Represents an example consisting of input and output content.
 */
export type InputOutput = {
  /**
   * The input content for the AI platform.
   */
  input: string

  /**
   * The expected output content from the AI platform.
   */
  output: string
}

/**
 * Represents the structure of the AI prompt which includes context and inputOutput.
 */

export function generatePrompt<T extends AIType>(
  aiType: T,
  context: string,
  inputOutput: InputOutput[],
  content: string,
) {
  if (aiType === 'Gemini') {
    const exampleMessages = []
    for (const example of inputOutput) {
      const inputExample = {
        role: 'user',
        parts: [{ text: String(example.input) }],
      } as Content
      exampleMessages.push(inputExample)
      const outputExample: Content = {
        role: 'model',
        parts: [{ text: example.output }],
      }
      exampleMessages.push(outputExample)
    }
    // First value of exampleMessages
    const firstExample = exampleMessages[0]
    const restExamples = exampleMessages.slice(1)
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: context + '\n' + firstExample.parts[0].text,
          },
        ],
      },
      ...restExamples,
      {
        role: 'user',
        parts: [
          {
            text: content,
          },
        ],
      },
    ] as Content[]
    return contents
  } else if (aiType === 'OpenAI') {
    const exampleMessages = []
    for (const example of inputOutput) {
      if (example.input)
        exampleMessages.push({
          role: 'user',
          content: example.input,
        } as ChatCompletionMessageParam)
      if (!example.output) continue
      exampleMessages.push({
        role: 'assistant',
        content: example.output,
      } as ChatCompletionMessageParam)
    }
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: context,
      },
      ...exampleMessages,
      {
        role: 'user',
        content,
      },
    ]

    return messages
  } else if (aiType === 'Claude') {
    const exampleMessages = []
    for (const example of inputOutput) {
      if (example.input)
        exampleMessages.push({
          role: 'user',
          content: example.input,
        } as MessageParam)
      if (!example.output) continue
      exampleMessages.push({
        role: 'assistant',
        content: example.output,
      } as MessageParam)
    }
    const messages: MessageParam[] = [
      {
        role: 'user',
        content: context,
      },
      {
        role: 'assistant',
        content: 'Yes, sir. I will follow your orders.',
      },
      ...exampleMessages,
      {
        role: 'user',
        content,
      },
    ]

    return messages
  } else {
    throw new Error('Unsupported AI type')
  }
}
