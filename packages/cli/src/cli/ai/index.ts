import { program } from '@/index'
import { promptUser } from './ai'
import chalk from 'chalk'
import { AIType } from '@skeet-framework/ai'
import { SKEET_CONFIG_PATH, importConfig } from '@/lib'
import { AiLog } from './aiLog'
import { readFileSync, writeFileSync } from 'fs'
import { SkeetCloudConfig } from '@/types/skeetTypes'

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
      const { ai } = importConfig()
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

const validEnv = (aiType: AIType, logger: AiLog) => {
  if (aiType === 'OpenAI') {
    const org = process.env.CHAT_GPT_ORG
    const key = process.env.CHAT_GPT_KEY
    if (!org || !key) {
      console.log(chalk.yellow(logger.text().warning.gptKey))
      process.exit(1)
    }
  } else {
    const org = process.env.GCP_PROJECT_ID
    const key = process.env.GCP_LOCATION
    if (!org || !key) {
      console.log(chalk.yellow(logger.text().warning.gcpKey))
      console.log(chalk.yellow('⚠️ Did you run `$ skeet iam ai`? ⚠️'))
      process.exit(1)
    }
  }
}

const defaultAiConfig = {
  lang: 'en',
  ais: [
    {
      name: 'Gemini',
      availableModels: ['gemini-1.0-pro', 'gemini-1.0-pro-vision'],
    },
  ],
}

const validateAiConfig = async () => {
  try {
    const config = readFileSync(`./skeet-cloud.config.json`)
    const skeetConfig: SkeetCloudConfig = JSON.parse(String(config))
    if (!skeetConfig.ai) {
      skeetConfig.ai = defaultAiConfig
      writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
    }
  } catch (error) {
    const skeetConfig = {
      ai: defaultAiConfig,
    }
    writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  }
}
