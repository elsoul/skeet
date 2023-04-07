import { Logger } from '@/lib/logger'
import fs from 'fs'
import path from 'path'
import { execSyncCmd } from '@/lib/execSyncCmd'
import * as fileDataOf from '@/templates/init'
import { sleep } from '@/utils/time'
import { APP_REPO_URL } from '@/lib/getSkeetConfig'

export const create = async (initAppName: string) => {
  await skeetCreate(initAppName)
}

export const skeetCreate = async (appName: string) => {
  const appDir = await createFunctionsDir(appName)
  const gitCloneCmd = ['git', 'clone', APP_REPO_URL, appDir]
  await execSyncCmd(gitCloneCmd)
  const yarnApiCmd = ['yarn']
  await execSyncCmd(yarnApiCmd, appDir)
  const rmDefaultGit = ['rm', '-rf', '.git']
  await execSyncCmd(rmDefaultGit, appDir)
  await generateInitFiles(appName)
  await sleep(2000)
  const yarnCmd = ['yarn']
  await execSyncCmd(yarnCmd, `./${appName}`)
}

export const createFunctionsDir = async (functionName: string) => {
  try {
    const functionDir = path.join(functionName, `./functions/${functionName}`)
    fs.mkdir(functionDir, { recursive: true }, (err) => {
      if (err) throw err
    })
    return functionDir
  } catch (error) {
    return `createFunctionsDir: ${error}`
  }
}

export const generateInitFiles = async (appName: string) => {
  const apiDir = path.join(appName, `./functions/${appName}`)
  const packageJson = await fileDataOf.packageJson(appName)
  fs.writeFileSync(
    packageJson.filePath,
    JSON.stringify(packageJson.body, null, 2)
  )

  const tsconfigJson = await fileDataOf.tsconfigJson(appName)
  fs.writeFileSync(
    tsconfigJson.filePath,
    JSON.stringify(tsconfigJson.body, null, 2)
  )
  const eslintrcJson = await fileDataOf.eslintrcJson(appName)
  fs.writeFileSync(
    eslintrcJson.filePath,
    JSON.stringify(eslintrcJson.body, null, 2)
  )

  const eslintignore = await fileDataOf.eslintignore(appName)
  fs.writeFileSync(eslintignore.filePath, eslintignore.body)
  const prettierrc = await fileDataOf.prettierrc(appName)
  fs.writeFileSync(
    prettierrc.filePath,
    JSON.stringify(prettierrc.body, null, 2)
  )
  const skeetCloudConfigGen = await fileDataOf.skeetCloudConfigGen(appName)
  fs.writeFileSync(skeetCloudConfigGen.filePath, skeetCloudConfigGen.body)
  const prettierignore = await fileDataOf.prettierignore(appName)
  fs.writeFileSync(prettierignore.filePath, prettierignore.body)
  const gitignore = await fileDataOf.gitignore(appName)
  fs.writeFileSync(gitignore.filePath, gitignore.body)
  const rmDefaultEnv = ['rm', '.env']
  await execSyncCmd(rmDefaultEnv, apiDir)
  const apiEnv = await fileDataOf.apiEnv(appName)
  fs.writeFileSync(apiEnv.filePath, apiEnv.body)
  const gitattributes = await fileDataOf.gitattributes(appName)
  fs.writeFileSync(gitattributes.filePath, gitattributes.body)
}
