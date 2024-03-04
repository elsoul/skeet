import { execSyncCmd } from '@/lib/execSyncCmd'
import { Logger } from '@/lib/logger'
import { sleep } from '@/utils/time'
import { questionList } from '../init/questionList'
import inquirer from 'inquirer'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { generateInitFiles } from './generateInitFile'
import { REPO } from '@/config/links'

export const createBackend = async (appName: string) => {
  const { template } = await inquirer.prompt<{ template: string }>(
    questionList.backendTemplateQuestions,
  )
  const appDir = './' + appName
  if (await checkFileDirExists(appDir)) {
    Logger.error(`Directory ${appName} already exists.`)
    process.exit(0)
  }
  const gitCloneCmd = ['git', 'clone', REPO.BACKEND_FUNCTIONS_REPO_URL, appName]
  const backendRootPath = `${appDir}/functions/skeet`

  await execSyncCmd(gitCloneCmd)
  const cmd = ['pnpm', 'install']
  await execSyncCmd(cmd, appDir)
  await execSyncCmd(cmd, backendRootPath)
  const rmDefaultGit = ['rm', '-rf', '.git']
  await execSyncCmd(rmDefaultGit, appDir)
  const rmDefaultGithubActions = ['rm', '-rf', '.github']
  await execSyncCmd(rmDefaultGithubActions, appDir)
  await sleep(1000)

  await generateInitFiles(appName, template)
  Logger.skeetAA()
  Logger.welcomText(appName, template)
  const nmb = Math.floor(Math.random() * 4 + 1)
  if (nmb === 4) {
    Logger.cmText()
  }
}
