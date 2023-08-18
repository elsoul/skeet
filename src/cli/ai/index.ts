import { program } from '@/index'
import { promptUser } from './ai'
import chalk from 'chalk'

export const aiCommands = () => {
  program
    .command('ai')
    .description('AI Playground')
    .option('-a, --ai <ai>', 'AI service name. vertexai or openai', 'vertexai')
    .action((options) => {
      console.log(`${chalk.yellow(`${options.ai} is selected 🤖`)}`)
      promptUser({
        ai: options.ai,
      })
    })
}
