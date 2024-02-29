import { ChatCompletionMessageParam } from 'openai/resources'
import { Content } from '@google-cloud/vertexai'

/**
 * Represents the AI platforms supported by the generatePrompt function.
 */
export type AIType = 'Gemini' | 'OpenAI'

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
): T extends 'Gemini' ? Content[] : ChatCompletionMessageParam[] {
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
    return contents as T extends 'Gemini'
      ? Content[]
      : ChatCompletionMessageParam[]
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

    return messages as T extends 'Gemini'
      ? Content[]
      : ChatCompletionMessageParam[]
  } else {
    throw new Error('Unsupported AI type')
  }
}

export const migrationPrompt = {
  context: `You are a specialist in naming database migration files. Users will provide you with a brief description of the database change they want to implement. Your task is to return a migration filename in camelCase that aptly describes the task. For example, when creating a new table, it's common to start the filename with "add". However, the prefix might vary based on the specific operation.`,
  inputOutput: [
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
  inputOutput: [
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
