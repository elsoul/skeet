import chalk from 'chalk'
import { readFileSync } from 'fs'
import { getRecentUpdatedFiles } from '@/cli/get/getRecentUpdatedFiles'
import inquirer from 'inquirer'
import { SkeetAiMode } from '@/types/skeetTypes'
import { promptUser } from '../ai'
import { AiLog } from '../aiLog'
import { yesOrNo } from './yesOrNoMode'
import { addStringTop } from '@/lib/files/addStringTop'
import { SkeetAIOptions } from '..'
import { readFile } from 'fs/promises'
import { typedocPrompt } from '../skeetai/typedoc/prompt'
import { chat } from '@skeet-framework/ai'

export const typedocMode = async (skeetAi: SkeetAIOptions, logger: AiLog) => {
  const log = logger.text() as SkeetLog
  console.log(chalk.cyan(log.typedocMode.init))
  const recentPaths = await getRecentUpdatedFiles(process.cwd(), 5)
  const paths = await inquirer.prompt([
    {
      type: 'list',
      name: 'path',
      message: `${log.typedocMode.modeDesc}`,
      choices: recentPaths.map((path) => {
        return { name: path, value: path }
      }),
    },
  ])
  const fileString = await readFile(paths.path, 'utf8')
  const prompt = typedocPrompt()
  const aiResponse = (await chat(
    prompt.context,
    prompt.examples,
    fileString,
    skeetAi.ai,
    false,
  )) as string
  console.log(
    chalk.blue('Skeet: ' + chalk.white(`${log.common.howAboutThis}\n\n`)) +
      `${chalk.white('```typescript\n')}` +
      chalk.white(aiResponse) +
      `${chalk.white('\n```')}`,
  )

  const typedocText = ` ${log.common.MayIAddDoc}`
  const isYesDoc = await yesOrNo(typedocText)
  if (isYesDoc) {
    await addStringTop(paths.path, aiResponse + '\n')
    console.log(chalk.white(`\n${log.common.addedDoc}`))
  }
  console.log(chalk.white(log.typedocMode.ExitingMode + '...\n'))
  await promptUser(skeetAi, logger)
  return
}
