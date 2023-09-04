import { program } from '@/index'
import { promptUser } from './ai'
import chalk from 'chalk'
import { AIType } from '@skeet-framework/ai'
import { SkeetAIOptions } from '@skeet-framework/ai'
import { importConfig } from '@/lib'
import { AiLog } from './aiLog'

const { ai } = importConfig()
const lang = ai.lang || 'en'
export const logger = new AiLog(lang)
export const log = logger.text() as SkeetLog

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
      validEnv(aiType as AIType)
      let model = options.openai
        ? options.model || 'gpt-4'
        : options.model || 'chat-bison@001'
      let maxTokens = options.token || '1000'
      let temperature = options.temperature || '0'
      if (Number(temperature) > 1 || Number(temperature) < 0) {
        console.log(chalk.yellow(log.warning.temperature))
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
        `${chalk.white(`${chalk.blue(aiType)} ${log.common.isSelected}`)}`
      )
      promptUser(aiOptions)
    })
}

const validEnv = (aiType: AIType) => {
  if (aiType === 'OpenAI') {
    const org = process.env.CHAT_GPT_ORG
    const key = process.env.CHAT_GPT_KEY
    if (!org || !key) {
      console.log(chalk.yellow(log.warning.gptKey))
      process.exit(1)
    }
  } else {
    const org = process.env.GCLOUD_PROJECT
    const key = process.env.REGION
    if (!org || !key) {
      console.log(chalk.yellow(log.warning.gcpKey))
      console.log(chalk.yellow('⚠️ Did you run `$ skeet iam ai`? ⚠️'))
      process.exit(1)
    }
  }
}
