import {
  BACKEND_FUNCTIONS_REPO_URL,
  BACKEND_GRAPHQL_REPO_URL,
  FUNCTIONS_PATH,
  Logger,
  execSyncCmd,
} from '@/lib'
import { generateInitFiles } from './create'
import { sleep } from '@/utils/time'
import { SkeetTemplateBackend } from '@/types/skeetTypes'
import { DEFAULT_FUNCTION_NAME } from '@/index'
import { existsSync } from 'fs'
import { questionList } from '../init/questionList'
import inquirer from 'inquirer'

export const createBackend = async (appName: string) => {
  const { template } = await inquirer.prompt<{ template: string }>(
    questionList.backendTemplateQuestions,
  )
  const appDir = './' + appName
  if (existsSync(appDir)) {
    Logger.error(`Directory ${appName} already exists.`)
    process.exit(0)
  }
  let gitCloneCmd = null
  let backendRootPath = ''
  if (template === SkeetTemplateBackend.Firestore) {
    gitCloneCmd = ['git', 'clone', BACKEND_FUNCTIONS_REPO_URL, appName]
    backendRootPath = `${appDir}/${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}`
  } else {
    gitCloneCmd = ['git', 'clone', BACKEND_GRAPHQL_REPO_URL, appName]
    backendRootPath = `${appDir}/graphql`
  }

  await execSyncCmd(gitCloneCmd)
  const yarnApiCmd = ['yarn']
  await execSyncCmd(yarnApiCmd, appDir)
  await execSyncCmd(yarnApiCmd, backendRootPath)
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
