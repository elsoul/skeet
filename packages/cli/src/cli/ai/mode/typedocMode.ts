import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import { readFileSync } from 'fs'
import { getRecentUpdatedFiles } from '@/cli/get/getRecentUpdatedFiles'
import inquirer from 'inquirer'
import { SkeetAiMode } from '@/types/skeetTypes'
import { promptUser } from '../ai'
import { AiLog } from '../aiLog'
import { yesOrNo } from './yesOrNoMode'
import { addStringTop } from '@/lib/files/addStringTop'

export const typedocMode = async (skeetAi: SkeetAI, logger: AiLog) => {
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
  const fileString = readFileSync(paths.path, 'utf8')
  const aiResponse = String(await skeetAi.typedoc(fileString))
  console.log(
    chalk.blue('Skeet: ' + chalk.white(`${log.common.howAboutThis}\n\n`)) +
      `${chalk.white('```typescript\n')}` +
      chalk.white(aiResponse) +
      `${chalk.white('\n```')}`
  )
  logger.addJson(
    'ai',
    aiResponse,
    SkeetAiMode.Typedoc,
    String(skeetAi.initOptions.model)
  )

  const typedocText = ` ${log.common.MayIAddDoc}`
  const isYesDoc = await yesOrNo(typedocText)
  if (isYesDoc) {
    const typedoc = await skeetAi.typedoc(aiResponse)
    addStringTop(paths.path, typedoc + '\n')
    console.log(chalk.white(`\n${log.common.addedDoc}`))
  }
  console.log(chalk.white(log.typedocMode.ExitingMode + '...\n'))
  promptUser(skeetAi.initOptions, logger)
  return
}
