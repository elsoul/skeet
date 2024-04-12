import { sleep } from '@/utils/time'
import {
  NEXT_REPO_URL,
  SOLANA_REPO_URL,
  APP_REPO_URL,
} from '@/lib/files/getSkeetConfig'
import inquirer from 'inquirer'
import { SkeetTemplate } from '@/types/skeetTypes'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import chalk from 'chalk'
import { execAsyncCmd } from '@/lib/execAsyncCmd'
import { generateInitFiles } from './generateInitFile'
import { Logger } from '@/lib/logger'

export const create = async (initAppName: string) => {
  const { template } = await inquirer.prompt<{ template: string }>([
    {
      type: 'list',
      message: 'Select Template of Skeet',
      name: 'template',
      choices: [
        new inquirer.Separator(' Templates '),
        { name: SkeetTemplate.NextJsFirestore },
        { name: SkeetTemplate.ExpoFirestore },
        { name: SkeetTemplate.SolanaFirestore },
      ],
      validate(answer: string) {
        if (answer.length < 1) {
          return 'You must choose at least one template.'
        }
        return true
      },
    },
  ])
  await skeetCreate(initAppName, template)
}

export const skeetCreate = async (appName: string, template: string) => {
  const appDir = './' + appName
  if (await checkFileDirExists(appDir)) {
    console.error(chalk.yellow(`Directory ${appName} already exists.`))
    process.exit(0)
  }
  let gitCloneCmd = null
  if (template === SkeetTemplate.NextJsFirestore) {
    gitCloneCmd = ['git', 'clone', NEXT_REPO_URL, appName]
  } else if (template === SkeetTemplate.SolanaFirestore) {
    gitCloneCmd = ['git', 'clone', SOLANA_REPO_URL, appName]
  } else {
    gitCloneCmd = ['git', 'clone', APP_REPO_URL, appName]
  }
  await execAsyncCmd(gitCloneCmd)
  const cmd = ['pnpm', 'install']
  await execAsyncCmd(cmd, appDir)
  await execAsyncCmd(cmd, `${appDir}/functions/skeet`)
  if (template === SkeetTemplate.SolanaFirestore) {
    await execAsyncCmd(cmd, `${appDir}/webapp`)
  }
  const rmDefaultGit = ['rm', '-rf', '.git']
  await execAsyncCmd(rmDefaultGit, appDir)
  const rmDefaultGithubActions = ['rm', '-rf', '.github']
  await execAsyncCmd(rmDefaultGithubActions, appDir)
  await sleep(1000)
  await execAsyncCmd(cmd, `./${appName}`)

  await generateInitFiles(appName, template)
  Logger.skeetAA()
  Logger.welcomText(appName)
  const nmb = Math.floor(Math.random() * 4 + 1)
  if (nmb === 4) {
    Logger.cmText()
  }
}
