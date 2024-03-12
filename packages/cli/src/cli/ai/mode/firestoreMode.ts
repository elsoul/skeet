import chalk from 'chalk'
import { promptUser } from '../ai'
import { appendFile, writeFile } from 'fs/promises'
import { chat } from '@skeet-framework/ai'
import inquirer from 'inquirer'
import { yesOrNo } from './yesOrNoMode'
import { AiLog } from '../aiLog'
import { SkeetAIOptions } from '..'
import { firestorePrompt } from '../skeetai/firestore/prompt'
import { modelNamingPrompt } from '../skeetai/naming/prompt'

export const firestoreMode = async (options: SkeetAIOptions, logger: AiLog) => {
  const log = logger.text() as SkeetLog
  console.log(chalk.cyan(log.firestoreMode.init))
  const inputMessage =
    log.firestoreMode.modeDesc +
    '\n\n' +
    log.common.example +
    log.firestoreMode.example1 +
    '\n\n' +
    chalk.green(log.common.you + ':')
  const answer = await inquirer.prompt<{ functionPath: string; input: string }>(
    [
      {
        type: 'input',
        name: 'input',
        message: inputMessage,
      },
    ],
  )
  const prompt = await firestorePrompt()
  const aiAnswer = (await chat(
    prompt.context,
    prompt.examples,
    answer.input,
    options.ai,
    false,
  )) as string
  const modelFilePrompt = await modelNamingPrompt()
  const modelFileSuggestion = (await chat(
    modelFilePrompt.context,
    modelFilePrompt.examples,
    aiAnswer,
    options.ai,
    false,
  )) as string
  console.log(
    chalk.blue(
      'Skeet:' +
        chalk.white(` ${log.common.howAboutThis}\n\n`) +
        `${chalk.white(`\`\`\`${modelFileSuggestion}\n`)}` +
        chalk.white(aiAnswer) +
        `${chalk.white('\n```')}`,
    ),
  )

  const text = ` ${log.common.MayICreateFile}: \n ${modelFileSuggestion}`
  const isYes = (await yesOrNo(text)) as boolean
  if (!isYes) {
    await firestoreMode(options, logger)
    return
  }
  const modelFilePath = `common/models/${modelFileSuggestion}`
  const modelIndexPath = `common/models/index.ts`
  await appendFile(
    modelIndexPath.replace('.ts', ''),
    `export * from './${modelFileSuggestion}'`,
  )
  await writeFile(modelFilePath, aiAnswer)
  const createdText = `\n${log.common.created}: ${modelFilePath}`
  console.log(chalk.white(createdText))
  console.log(chalk.white(`\n${log.firestoreMode.ExitingMode}...\n`))
  await promptUser(options, logger)
  return
}
