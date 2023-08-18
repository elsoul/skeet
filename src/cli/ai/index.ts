import { program } from '@/index'
import { promptUser } from './ai'
import chalk from 'chalk'
import { VertexAI } from '@skeet-framework/ai'
import { skeetVPrompt } from './skeetPrompt'

export const aiCommands = () => {
  program
    .command('ai')
    .description('AI Playground')
    .option('-v, --vertex', 'Vertex AI')
    .option('-o, --openai', 'OpenAI')
    .action(async (options) => {
      let aiType = 'VertexAI'
      if (options.openai) aiType = 'OpenAI'
      console.log(
        `${chalk.white(
          `${chalk.blue(aiType)} is selected 🤖 (type "q" to quit)`
        )}`
      )
      promptUser({
        ai: aiType,
      })
    })
}
