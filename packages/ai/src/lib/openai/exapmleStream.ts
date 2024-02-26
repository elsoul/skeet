import { OpenAI } from '.'
import { ReadStream } from 'fs'
import { ChatCompletionMessageParam } from 'openai/resources'

const run = async () => {
  const prompt: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
    },
    {
      role: 'user',
      content:
        'What is the Skeet framework and what benefits does it offer for app development?',
    },
    {
      role: 'assistant',
      content:
        'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
    },
    {
      role: 'user',
      content: 'Tell me about the Skeet framework.',
    },
  ]
  const openAi = new OpenAI()
  const stream = await openAi.promptStream(prompt)
  const stream2 = ReadStream.from(stream)
  stream2.on('data', (part) => {
    console.log(part.choices[0].delta.content)
  })
}

run()
