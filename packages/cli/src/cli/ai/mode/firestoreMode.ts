import chalk from 'chalk'
import { promptUser } from '../ai'
import { appendFile, writeFile } from 'fs/promises'
import { NamingEnum } from '@skeet-framework/ai'
import { SkeetAiMode, SkeetRole } from '@/types/skeetTypes'
import inquirer from 'inquirer'
import { yesOrNo } from './yesOrNoMode'
import { AiLog } from '../aiLog'
import { PATH } from '@/config/path'
import { SkeetAIOptions } from '..'

export const firestoreMode = async (options: SkeetAIOptions, logger: AiLog) => {
  const log = logger.text() as SkeetLog
  console.log(chalk.cyan(log.firestoreMode.init))
  const model = String(options.model)
  const inputMessage =
    log.firestoreMode.modeDesc +
    '\n\n' +
    log.common.example +
    log.firestoreMode.example1 +
    '\n\n' +
    chalk.green(log.common.you + ':')
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'input',
      message: inputMessage,
    },
  ])
  // const aiAnswer = (await skeetAi.firestore(answer.input)) as string
  // const modelFileSuggestion = (await skeetAi.naming(
  //   aiAnswer,
  //   NamingEnum.MODEL,
  // )) as string
  // console.log(
  //   chalk.blue(
  //     'Skeet:' +
  //       chalk.white(` ${log.common.howAboutThis}\n\n`) +
  //       `${chalk.white(`\`\`\`${modelFileSuggestion}\n`)}` +
  //       chalk.white(aiAnswer) +
  //       `${chalk.white('\n```')}`,
  //   ),
  // )

  // const text = ` ${log.common.MayICreateFile}: \n ${modelFileSuggestion}`
  // const isYes = (await yesOrNo(text)) as boolean
  // if (!isYes) {
  //   firestoreMode(skeetAi, logger)
  //   return
  // }
  // const modelFilePath = `${PATH.MODEL}/${modelFileSuggestion}`
  // const modelIndexPath = `${PATH.MODEL}/index.ts`
  // await appendFile(
  //   modelIndexPath.replace('.ts', ''),
  //   `export * from './${modelFileSuggestion}'`,
  // )
  // await writeFile(modelFilePath, aiAnswer)
  // const createdText = `\n${log.common.created}: ${modelFilePath}`
  // console.log(chalk.white(createdText))
  // console.log(chalk.white(`\n${log.firestoreMode.ExitingMode}...\n`))
  // await promptUser(skeetAi.initOptions, logger)
  return
}
