import inquirer from 'inquirer'
import { SkeetAIMode } from './skeetAiConfig'
import { prismaMode } from './mode/prismaMode'
import { SkeetAIOptions } from '.'
import { AiLog } from './aiLog'
import { firestoreMode } from './mode/firestoreMode'
import { functionMode } from './mode/functionMode'
import { methodMode } from './mode/methodMode'
import { promptUser } from './ai'
import { typedocMode } from './mode/typedocMode'
import { incrementModeFrequency } from './incrementModeFrequency'
import { createOrReadModeFrequency } from './createOrReadModeFrequency'

export const defaultModeFrequency = {
  prisma: 0,
  typedoc: 0,
  firestore: 0,
  function: 0,
  method: 0,
}

export type ModeFrequency = typeof defaultModeFrequency

export const modeSelect = async (options: SkeetAIOptions, logger: AiLog) => {
  const choices = await createOrReadModeFrequency()
  const answer = await inquirer.prompt<{ mode: keyof ModeFrequency }>([
    {
      type: 'list',
      name: 'mode',
      message: '🤖 Select Mode',
      choices,
    },
  ])
  await incrementModeFrequency(answer.mode)
  switch (answer.mode) {
    case SkeetAIMode.Prisma:
      await prismaMode(options, logger)
      break
    case SkeetAIMode.Typedoc:
      await typedocMode(options, logger)
      break
    case SkeetAIMode.Firestore:
      await firestoreMode(options, logger)
      break
    case SkeetAIMode.Function:
      await functionMode(options, logger)
      break
    case SkeetAIMode.Method:
      await methodMode(options, logger)
      break
    default:
      await promptUser(options, logger)
      break
  }
}
