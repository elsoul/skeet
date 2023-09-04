import { DEFAULT_FUNCTION_NAME } from '@/index'
import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import { promptUser } from '../ai'
import { spawnSync } from 'child_process'
import { appendFileSync, writeFileSync } from 'fs'
import { FUNCTIONS_PATH } from '@/lib'
import { NamingEnum } from '@skeet-framework/ai'
import { log, logger } from '..'
import { SkeetAiMode, SkeetRole } from '@/types/skeetTypes'
import inquirer from 'inquirer'
import { yesOrNo } from './yesOrNoMode'

export const firestoreMode = async (skeetAi: SkeetAI) => {
  console.log(chalk.cyan(log.firestoreMode.init))
  const model = String(skeetAi.initOptions.model)
  const inputMessage =
    log.firestoreMode.modeDesc +
    '\n\n' +
    log.common.example +
    log.firestoreMode.example1 +
    '\n\n' +
    chalk.green(log.common.you + ':')
  logger.addJson(SkeetRole.AI, inputMessage, SkeetAiMode.Firestore, model)
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'input',
      message: inputMessage,
    },
  ])
  logger.addJson(SkeetRole.USER, answer.input, SkeetAiMode.Firestore, model)
  const aiAnswer = (await skeetAi.firestore(answer.input)) as string
  const modelFileSuggestion = (await skeetAi.naming(
    aiAnswer,
    NamingEnum.MODEL
  )) as string
  console.log(
    chalk.blue(
      'Skeet:' +
        chalk.white(` ${log.common.howAboutThis}\n\n`) +
        `${chalk.white(`\`\`\`${modelFileSuggestion}\n`)}` +
        chalk.white(aiAnswer) +
        `${chalk.white('\n```')}`
    )
  )

  const text = ` ${log.common.MayICreateFile}: \n ${modelFileSuggestion}`
  logger.addJson(SkeetRole.AI, aiAnswer + text, SkeetAiMode.Firestore, model)
  const isYes = (await yesOrNo(text)) as boolean
  if (!isYes) {
    logger.addJson(SkeetRole.USER, 'No', SkeetAiMode.Firestore, model)
    firestoreMode(skeetAi)
    return
  }
  logger.addJson(SkeetRole.USER, 'Yes', SkeetAiMode.Firestore, model)

  const modelFilePath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/models/${modelFileSuggestion}`
  const modelIndexPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/models/index.ts`
  appendFileSync(
    modelIndexPath.replace('.ts', ''),
    `export * from './${modelFileSuggestion}'`
  )
  writeFileSync(modelFilePath, aiAnswer)
  const createdText = `\n${log.common.created}: ${modelFilePath}`
  console.log(chalk.white(createdText))
  console.log(
    chalk.white(`${log.common.thenRun}`),
    chalk.green(`$ skeet sync models`)
  )
  const syncText = log.common.mayISyncModel
  logger.addJson(
    SkeetRole.AI,
    createdText + syncText,
    SkeetAiMode.Firestore,
    model
  )
  const runSync = (await yesOrNo(syncText)) as boolean
  if (runSync) {
    spawnSync(`skeet sync models`, {
      stdio: 'inherit',
      shell: true,
    })
    logger.addJson(SkeetRole.USER, 'Yes', SkeetAiMode.Firestore, model)
    promptUser(skeetAi.initOptions)
    return
  }
  logger.addJson(SkeetRole.USER, 'No', SkeetAiMode.Firestore, model)
  console.log(chalk.white(`\n${log.firestoreMode.ExitingMode}...\n`))
  promptUser(skeetAi.initOptions)
  return
}
