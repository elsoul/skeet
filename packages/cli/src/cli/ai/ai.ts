import chalk from 'chalk'
import { skeetAiPrompt } from './skeetPrompt'
// import { prismaMode } from './mode/prismaMode'
// import { skeetMode } from './mode/skeetMode'
// import { typedocMode } from './mode/typedocMode'
// import { translateMode } from './mode/translateMode'
// import { firestoreMode } from './mode/firestoreMode'
// import { functionMode } from './mode/functionMode'
// import { SkeetAiMode, SkeetRole } from '@/types/skeetTypes'
// import { methodMode } from './mode/methodMode'
import inquirer from 'inquirer'
import { AiLog } from './aiLog'
import { SkeetAIOptions } from '.'
import { Readable } from 'stream'
import {
  ConfigGeminiType,
  ConfigOpenAIType,
  OpenAIModel,
  chat,
  defaultGeminiConfig,
  geminiChat,
  generatePrompt,
  openAIChat,
  readGeminiStream,
  readOpenAIStream,
} from '@skeet-framework/ai'

const GEMINI = 'Gemini'
const OPENAI = 'OpenAI'
type AIType = 'Gemini' | 'OpenAI'

export async function promptUser(
  options: SkeetAIOptions,
  logger: AiLog,
): Promise<void> {
  const log = logger.text() as SkeetLog
  const aiOptions = {
    ai: (options.ai as AIType) || ('Gemini' as AIType),
    maxTokens: options.maxTokens || '1000',
    model: options.model || defaultGeminiConfig.model,
    temperature: options.temperature || '0.1',
  }

  console.log('\n')
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'input',
      message:
        chalk.white(`${log.common.start}\n`) +
        chalk.green(`\n${log.common.you}:`),
    },
  ])

  if (userInput.input.toLowerCase() === 'q') {
    console.log(
      chalk.white(`⭐️ ${chalk.blue(aiOptions.ai)} ${log.common.shutdown}...`),
    )
    process.exit(0)
  }
  if (userInput.input.toLowerCase() === '') {
    promptUser(aiOptions, logger)
    return
  }
  console.log(chalk.blue('Skeet:'))

  // if (userInput.input.toLowerCase().match(/^\$ prisma$/)) {
  //   await prismaMode(aiOptions, logger)
  //   return
  // }
  // if (userInput.input.toLowerCase().match(/^\$ skeet/)) {
  //   await skeetMode(userInput.input, skeetAi, logger)
  //   return
  // }
  // if (userInput.input.toLowerCase().match(/^\$ typedoc/)) {
  //   await typedocMode(skeetAi, logger)
  //   return
  // }
  // if (userInput.input.toLowerCase().match(/^\$ translate/)) {
  //   await translateMode(skeetAi, logger)
  //   promptUser(aiOptions, logger)
  //   return
  // }
  // if (userInput.input.toLowerCase().match(/^\$ firestore/)) {
  //   await firestoreMode(skeetAi, logger)
  //   return
  // }
  // if (userInput.input.toLowerCase().match(/^\$ function/)) {
  //   await functionMode(skeetAi, logger)
  //   return
  // }
  // if (userInput.input.toLowerCase().match(/^\$ method/)) {
  //   await methodMode(skeetAi, logger)
  //   return
  // }
  // if (userInput.input.toLowerCase().match(/^\$ help/)) {
  //   logger.help()
  //   promptUser(aiOptions, logger)
  //   return
  // }

  const skeetPrompt = skeetAiPrompt('en')
  await chat(
    skeetPrompt.context,
    skeetPrompt.examples,
    userInput.input,
    aiOptions.ai,
  )
  await promptUser(aiOptions, logger)
}
