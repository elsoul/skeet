import { VertexPromptParams } from '../types/vertexaiTypes'
import { VertexAI } from '.'

const run = async () => {
  const prompt: VertexPromptParams = {
    context:
      'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
    examples: [
      {
        input: {
          content:
            'What is the Skeet framework and what benefits does it offer for app development?',
        },
        output: {
          content:
            'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content: 'Tell me about the Skeet framework.',
      },
    ],
  }

  const vertexAi = new VertexAI({
    maxOutputTokens: 3000,
  })
  const response = await vertexAi.prompt(prompt)
  console.log('Question:\n', prompt.messages[0].content)
  console.log('Answer:\n', response)

  const content =
    'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.'
  const promptTitle = await vertexAi.generateTitlePrompt(content)
  const title = await vertexAi.prompt(promptTitle)
  console.log('\nOriginal content:\n', content)
  console.log('\nGenerated title:\n', title)
}

run()
