import { program } from '@/index'
import { promptUser } from './ai'
import chalk from 'chalk'
import { AIType } from '@skeet-framework/ai'
import { SkeetAIOptions } from '@skeet-framework/ai'
import Table from 'cli-table3'

export const aiCommands = () => {
  program
    .command('ai')
    .description('AI Playground')
    .option('-v, --vertex', 'Vertex AI')
    .option('-o, --openai', 'OpenAI')
    .option('-m, --model <string>', 'Model')
    .option('-token, --token <number>', 'Max Tokens')
    .option('-temp, --temperature <number>', 'Temperature')
    .action(async (options) => {
      let aiType = options.openai ? 'OpenAI' : 'VertexAI'
      let model = options.openai
        ? options.model || 'gpt-4'
        : options.model || 'chat-bison@001'

      let maxTokens = options.token || '1000'
      let temperature = options.temperature || '0'
      if (Number(temperature) > 1) {
        console.log(chalk.yellow('⚠️ Temperature must be between 0 and 1 ⚠️'))
        process.exit(1)
      }

      const aiOptions: SkeetAIOptions = {
        ai: aiType as AIType,
        maxTokens,
        model,
        temperature,
      }

      const table = new Table({
        head: [chalk.blue('Option'), chalk.blue('Value')],
        chars: {
          top: '═',
          'top-mid': '╤',
          'top-left': '╔',
          'top-right': '╗',
          bottom: '═',
          'bottom-mid': '╧',
          'bottom-left': '╚',
          'bottom-right': '╝',
          left: '│',
          'left-mid': '╟',
          mid: '─',
          'mid-mid': '┼',
          right: '│',
          'right-mid': '╢',
          middle: '│',
        }, // テーブルの罫線スタイルを指定
      })

      table.push(
        ['AI Type', aiType],
        ['Model', model],
        ['Max Tokens', aiOptions.maxTokens],
        ['Temperature', aiOptions.temperature]
      )

      console.log(table.toString())
      console.log(
        `${chalk.white(
          `${chalk.blue(aiType)} is selected 🤖 (type "q" to quit)`
        )}`
      )
      promptUser(aiOptions)
    })
}
