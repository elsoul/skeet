import { program } from '@/index'
import { promptUser } from './ai'
import chalk from 'chalk'
import { AIType } from '@skeet-framework/ai'
import { importConfig } from '@/lib/files/importConfig'
import { AiLog } from './aiLog'
import { validEnv } from './validEnv'
import { validateAiConfig } from './validateAiConfig'
import { modeSelect } from './modeSelect'

export type SkeetAIOptions = {
  ai: AIType
}

export const aiCommands = () => {
  program
    .command('ai')
    .description('AI Playground')
    .option('-g, --gemini', 'Gemini')
    .option('-o, --openai', 'OpenAI')
    .option('--mode', 'Mode')
    .action(async (options) => {
      await validateAiConfig()
      const { ai } = await importConfig()
      const lang = ai.lang as 'en' | 'ja'
      const logger = new AiLog(lang)
      const aiType = options.openai ? 'OpenAI' : 'Gemini'
      validEnv(aiType as AIType, logger)
      const aiOptions: SkeetAIOptions = {
        ai: aiType as AIType,
      }

      if (options.mode) {
        await modeSelect(aiOptions, logger)
        return
      }

      logger.aiOptionTable(aiOptions)
      logger.help()
      console.log(
        `${chalk.white(
          `${chalk.blue(aiType)} ${logger.text().common.isSelected}`,
        )}`,
      )
      await promptUser(aiOptions, logger)
    })
}
