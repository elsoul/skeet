import {
  AIType,
  OpenAI,
  OpenAIPromptParams,
  SkeetAI,
  VertexAI,
  VertexPromptParams,
  generatePrompt,
} from '@skeet-framework/ai'
import chalk from 'chalk'
import { skeetAiPrompt } from './skeetPrompt'
import { vertexStream } from './vertexStream'
import { openaiStream } from './openaiStream'
import { prismaMode } from './mode/prismaMode'
import { SkeetAIOptions } from '@skeet-framework/ai'
import { skeetMode } from './mode/skeetMode'
import { typedocMode } from './mode/typedocMode'
import { translateMode } from './mode/translateMode'
import { firestoreMode } from './mode/firestoreMode'
import { functionMode } from './mode/functionMode'
import { SkeetAiMode, SkeetRole } from '@/types/skeetTypes'
import { methodMode } from './mode/methodMode'
import inquirer from 'inquirer'
import { AiLog } from './aiLog'

export async function promptUser(
  options: SkeetAIOptions,
  logger: AiLog
): Promise<void> {
  const log = logger.text() as SkeetLog
  const aiOptions = {
    ai: (options.ai as AIType) || ('VertexAI' as AIType),
    maxTokens: 1000,
    model: options.model || 'chat-bison-32k',
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
      chalk.white(`⭐️ ${chalk.blue(aiOptions.ai)} ${log.common.shutdown}...`)
    )
    process.exit(0)
  }
  if (userInput.input.toLowerCase() === '') {
    promptUser(aiOptions, logger)
    return
  }
  console.log(chalk.blue('Skeet:'))
  const skeetAi = new SkeetAI(aiOptions)

  if (userInput.input.toLowerCase().match(/^\$ prisma$/)) {
    await prismaMode(skeetAi, logger)
    return
  }
  if (userInput.input.toLowerCase().match(/^\$ skeet/)) {
    await skeetMode(userInput.input, skeetAi, logger)
    return
  }
  if (userInput.input.toLowerCase().match(/^\$ typedoc/)) {
    await typedocMode(skeetAi, logger)
    return
  }
  if (userInput.input.toLowerCase().match(/^\$ translate/)) {
    await translateMode(skeetAi, logger)
    promptUser(aiOptions, logger)
    return
  }
  if (userInput.input.toLowerCase().match(/^\$ firestore/)) {
    await firestoreMode(skeetAi, logger)
    return
  }
  if (userInput.input.toLowerCase().match(/^\$ function/)) {
    await functionMode(skeetAi, logger)
    return
  }
  if (userInput.input.toLowerCase().match(/^\$ method/)) {
    await methodMode(skeetAi, logger)
    return
  }
  if (userInput.input.toLowerCase().match(/^\$ help/)) {
    logger.help()
    promptUser(aiOptions, logger)
    return
  }

  const skeetPrompt = skeetAiPrompt('en')

  const prompt = generatePrompt(
    skeetPrompt.context,
    skeetPrompt.examples,
    userInput.input,
    aiOptions.ai
  )
  logger.addJson(
    SkeetRole.USER,
    userInput.input,
    SkeetAiMode.Skeet,
    aiOptions.model
  )

  if (aiOptions.ai === 'VertexAI') {
    try {
      const ai = skeetAi.aiInstance as VertexAI
      const stream = await ai.promptStream(prompt as VertexPromptParams)
      vertexStream(stream, skeetAi.initOptions, logger)
    } catch (error) {
      console.error('Error:', error)
      process.exit(1)
    }
  } else {
    try {
      const ai = skeetAi.aiInstance as OpenAI
      const stream = await ai.promptStream(prompt as OpenAIPromptParams)
      openaiStream(stream, skeetAi.initOptions, logger)
    } catch (error) {
      console.error('Error:', error)
      process.exit(1)
    }
  }
}
