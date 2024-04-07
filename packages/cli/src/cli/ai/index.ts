import { program } from '@/index'
import { promptUser } from './ai'
import chalk from 'chalk'
import { AIType } from '@skeet-framework/ai'
import { AiLog } from './aiLog'
import { validEnv } from './validEnv'
import { modeSelect } from './modeSelect'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export type SkeetAIOptions = {
  ai: AIType
}

export const aiCommands = () => {
  program
    .command('ai')
    .description('Call Skeet AI Assistant')
    .option('-g, --gemini', 'Use Gemini - default')
    .option('-o, --openai', 'Use OpenAI')
    .option('-c, --claude', 'Use Claude')
    .option('--mode', 'Call Mode Select Prompt')
    .action(async (options) => {
      const config = await readOrCreateConfig()
      const lang = config.lang as 'en' | 'ja'
      const logger = new AiLog(lang)
      let aiType = 'Gemini'
      if (options.claude) {
        aiType = 'Claude'
      } else if (options.openai) {
        aiType = 'OpenAI'
      } else {
      }
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
