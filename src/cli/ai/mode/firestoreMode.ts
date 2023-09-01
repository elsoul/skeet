import { DEFAULT_FUNCTION_NAME } from '@/index'
import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { promptUser } from '../ai'
import { yesOrNoMode } from './yesOrNoMode'
import { spawnSync } from 'child_process'
import { appendFileSync, writeFileSync } from 'fs'
import { FUNCTIONS_PATH } from '@/lib'
import { NamingEnum } from '@skeet-framework/ai'

export const firestoreMode = async (
  skeetAi: SkeetAI,
  rl: readline.Interface
) => {
  console.log(chalk.cyan('🔥 Firestore Model Generating Mode 🔥'))
  console.log(chalk.white(`Please describe your Firestore use case.`))
  rl?.question(chalk.green('\nYou: '), async (input: string) => {
    const aiAnswer = (await skeetAi.firestore(input)) as string
    const modelFileSuggestion = (await skeetAi.naming(
      aiAnswer,
      NamingEnum.MODEL
    )) as string
    console.log(
      chalk.blue(
        'Skeet:' +
          chalk.white(' How about this one?\n\n') +
          `${chalk.white(`\`\`\`${modelFileSuggestion}\n`)}` +
          chalk.white(aiAnswer) +
          `${chalk.white('\n```')}`
      )
    )
    const text = `\n❓ May I create ${chalk.green(
      modelFileSuggestion
    )} file for you? (Yes/No) `
    const isYes = (await yesOrNoMode(rl, text)) as boolean
    if (!isYes) {
      firestoreMode(skeetAi, rl)
      return
    }

    const modelFilePath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/models/${modelFileSuggestion}`
    const modelIndexPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/models/index.ts`
    appendFileSync(modelIndexPath, `\nexport * from './${modelFileSuggestion}'`)
    writeFileSync(modelFilePath, aiAnswer)
    console.log(chalk.white(`\nCreated: ${modelFilePath}`))
    console.log(chalk.white(`\nThen run:`), chalk.green(`$ skeet sync models`))
    const syncText = '\n❓ Do you want me to sync models now? (Yes/No) '
    const runSync = (await yesOrNoMode(rl, syncText)) as boolean
    if (runSync) {
      spawnSync(`skeet sync models`, {
        stdio: 'inherit',
        shell: true,
      })
    }
    console.log(chalk.white(`\nExiting Firestore Mode...\n`))
    promptUser(skeetAi.initOptions)
  })
  return
}
