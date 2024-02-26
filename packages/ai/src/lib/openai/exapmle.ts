import { readFileSync } from 'fs'
import { OpenAIPromptParams } from '@/lib/types/openaiTypes'
import { OpenAI } from '.'
import { generatePrompt } from '@/lib/genPrompt'
import SkeetAI from '@/lib/skeetai'
const exampleJosn = JSON.parse(
  readFileSync('./src/lib/examplePrompt.json', 'utf8'),
)

const run = async () => {
  const content = 'What is the skeet framework?'
  const prompt = generatePrompt(
    exampleJosn.context,
    exampleJosn.examples,
    content,
    'OpenAI',
  )
  console.log('Prompt:\n', prompt)
  const openAi = new SkeetAI({
    ai: 'OpenAI',
    model: 'gpt-4-turbo-preview',
  }).aiInstance as OpenAI
  const result = await openAi.prompt(prompt)

  console.log('Question:\n', content)
  console.log('\nAnswer:\n', result)
  // const content2 =
  //   'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.'
  // const title = await openAi.generateTitle(content2)
  // console.log('\nGenerated title:\n', title)
}

run()
