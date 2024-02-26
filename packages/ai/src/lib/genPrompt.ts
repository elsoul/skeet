import { inspect } from 'util'
import { OpenAIPromptParams, VertexExample, VertexPromptParams } from './types'
import { ChatCompletionMessageParam } from 'openai/resources'

/**
 * Represents the AI platforms supported by the generatePrompt function.
 */
export type AIType = 'VertexAI' | 'OpenAI'

/**
 * Represents an example consisting of input and output content.
 */
export type AIExample = {
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
 * Represents the structure of the AI prompt which includes context and examples.
 */
export interface AIPrompt {
  /**
   * The context or background information for the AI prompt.
   */
  context: string

  /**
   * An array of examples, each consisting of input and output pairs.
   */
  examples: AIExample[]
}

export function generatePrompt(
  context: string,
  examples: AIExample[],
  content: string,
  ai: AIType,
): VertexPromptParams | OpenAIPromptParams {
  if (ai === 'VertexAI') {
    const exampleMessages = []
    for (const example of examples) {
      const exampleSet = { input: { content: '' }, output: { content: '' } }
      if (example.input) exampleSet.input = { content: example.input }
      if (!example.output) continue
      exampleSet.output = { content: example.output }

      if (exampleSet.input.content !== '' && exampleSet.output.content !== '')
        exampleMessages.push(exampleSet)
    }

    return {
      context,
      examples: exampleMessages,
      messages: [
        {
          author: 'user',
          content,
        },
      ],
    } as VertexPromptParams
  } else if (ai === 'OpenAI') {
    const exampleMessages = []
    for (const example of examples) {
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

    return { messages }
  } else {
    throw new Error('Unsupported AI type')
  }
}

export const migrationPrompt = {
  context: `You are a specialist in naming database migration files. Users will provide you with a brief description of the database change they want to implement. Your task is to return a migration filename in camelCase that aptly describes the task. For example, when creating a new table, it's common to start the filename with "add". However, the prefix might vary based on the specific operation.`,
  examples: [
    {
      input: 'Create a new users table',
      output: 'addUsersTable',
    },
    {
      input: 'Remove the email column from the users table',
      output: 'removeEmailFromUsers',
    },
    {
      input: 'Add a foreign key to posts referencing users',
      output: 'addForeignKeyToPosts',
    },
    {
      input: 'Change data type of age column in employees table',
      output: 'changeAgeTypeInEmployees',
    },
    {
      input: 'Create a new index on the name column of the products table',
      output: 'addNameIndexToProducts',
    },
  ],
}

export const namingPrompt = {
  context: `You are a specialist in naming TypeScript functions. Users will provide you with a brief description of the function they want to create. Your task is to return a function name related to the described task in camelCase, ranging from 4 to 20 characters. Even if the user's description is vague or unusual, try to come up with the most appropriate name.`,
  examples: [
    {
      input: 'Create a user',
      output: 'createUser',
    },
    {
      input: 'Use GitHub API to get user data',
      output: 'getGitHubUserData',
    },
    {
      input: 'Calculate tax for product',
      output: 'calculateProductTax',
    },
    {
      input: 'Transform text to uppercase',
      output: 'transformToUppercase',
    },
    {
      input: 'Find the oldest person in a list',
      output: 'findOldestPerson',
    },
    {
      input: 'Save data to local storage',
      output: 'saveToLocalStorage',
    },
    {
      input: 'Fetch latest news from server',
      output: 'fetchLatestNews',
    },
  ],
}
