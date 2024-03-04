import { program } from '@/index'
import { promptUser } from './ai'
import chalk from 'chalk'
import { AIType } from '@skeet-framework/ai'
import { importConfig } from '@/lib/files/importConfig'
import { AiLog } from './aiLog'
import { validEnv } from './validEnv'
import { validateAiConfig } from './validateAiConfig'

export type SkeetAIOptions = {
  ai: AIType
  maxTokens: string
  model: string
  temperature: string
}

export const aiCommands = () => {
  program
    .command('ai')
    .description('AI Playground')
    .option('-g, --gemini', 'Gemini')
    .option('-o, --openai', 'OpenAI')
    .option('-m, --model <string>', 'Model')
    .option('-token, --token <number>', 'Max Tokens')
    .option('-temp, --temperature <number>', 'Temperature')
    .action(async (options) => {
      await validateAiConfig()
      const { ai } = await importConfig()
      const lang = ai.lang as 'en' | 'ja'
      const logger = new AiLog(lang)
      const aiType = options.openai ? 'OpenAI' : 'Gemini'
      validEnv(aiType as AIType, logger)
      const model = options.openai
        ? options.model || 'gpt-4-turbo-preview'
        : options.model || 'gemini-1.0-pro'
      const maxTokens = options.token || '1000'
      const temperature = options.temperature || '0'
      if (Number(temperature) > 1 || Number(temperature) < 0) {
        console.log(chalk.yellow(logger.text().warning.temperature))
        process.exit(1)
      }

      const aiOptions: SkeetAIOptions = {
        ai: aiType as AIType,
        maxTokens,
        model,
        temperature,
      }

      logger.aiOptionTable(aiOptions)
      logger.help()
      console.log(
        `${chalk.white(
          `${chalk.blue(aiType)} ${logger.text().common.isSelected}`,
        )}`,
      )
      promptUser(aiOptions, logger)
    })
}
