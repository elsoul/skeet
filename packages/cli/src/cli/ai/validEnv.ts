import { AiLog } from './aiLog'
import chalk from 'chalk'
import { AIType } from '@skeet-framework/ai'

export const validEnv = (aiType: AIType, logger: AiLog) => {
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
