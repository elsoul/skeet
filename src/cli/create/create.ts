import { Logger } from '@/lib/logger'
import fs from 'fs'
import { execSyncCmd } from '@/lib/execSyncCmd'
import * as fileDataOf from '@/templates/init'
import { sleep } from '@/utils/time'
import {
  APP_REPO_URL,
  FUNCTIONS_PATH,
  ROUTE_PACKAGE_JSON_PATH,
} from '@/lib/getSkeetConfig'

export const create = async (initAppName: string) => {
  await skeetCreate(initAppName)
}

export const skeetCreate = async (appName: string) => {
  const appDir = './' + appName
  if (fs.existsSync(appDir)) {
    Logger.error(`Directory ${appName} already exists.`)
    process.exit(0)
  }
  const gitCloneCmd = ['git', 'clone', APP_REPO_URL, appName]
  await execSyncCmd(gitCloneCmd)
  const yarnApiCmd = ['yarn']
  await execSyncCmd(yarnApiCmd, appDir)
  await execSyncCmd(yarnApiCmd, `${appDir}/${FUNCTIONS_PATH}/openai`)
  fs.writeFileSync(
    `${appDir}/${FUNCTIONS_PATH}/openai/.env`,
    `SKEET_APP_NAME=${appName}\nPROJECT_ID=${appName}\nREGION=europe-west4`
  )
  fs.writeFileSync(
    `${appDir}/.env`,
    `SKEET_APP_NAME=${appName}\nPROJECT_ID=${appName}\nREGION=europe-west4`
  )
  const rmDefaultGit = ['rm', '-rf', '.git']
  await execSyncCmd(rmDefaultGit, appDir)
  await generateInitFiles(appName)
  await sleep(2000)
  const yarnCmd = ['yarn']
  await execSyncCmd(yarnCmd, `./${appName}`)

  Logger.skeetAA()
  Logger.welcomText(appName)
  const nmb = Math.floor(Math.random() * 4 + 1)
  if (nmb === 4) {
    Logger.cmText()
  }
}

export const generateInitFiles = async (appName: string) => {
  // const tsconfigJson = await fileDataOf.tsconfigJson(appName)
  // fs.writeFileSync(
  //   tsconfigJson.filePath,
  //   JSON.stringify(tsconfigJson.body, null, 2)
  // )
  await initPackageJson(appName)
  await initAppJson(appName)
  const eslintrcJson = await fileDataOf.eslintrcJson(appName)
  fs.writeFileSync(
    eslintrcJson.filePath,
    JSON.stringify(eslintrcJson.body, null, 2)
  )

  const eslintignore = await fileDataOf.eslintignore(appName)
  fs.writeFileSync(eslintignore.filePath, eslintignore.body)

  const firebaserc = await fileDataOf.firebaserc(appName)
  fs.writeFileSync(firebaserc.filePath, firebaserc.body)

  const firestoreIndexesJson = await fileDataOf.firestoreIndexesJson(appName)
  fs.writeFileSync(firestoreIndexesJson.filePath, firestoreIndexesJson.body)

  // Generate firestore.rules
  // const firestoreRules = await fileDataOf.firestoreRules(appName)
  // fs.writeFileSync(firestoreRules.filePath, firestoreRules.body)

  const databaseRulesJson = await fileDataOf.databaseRulesJson(appName)
  fs.writeFileSync(databaseRulesJson.filePath, databaseRulesJson.body)
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
  const gitattributes = await fileDataOf.gitattributes(appName)
  fs.writeFileSync(gitattributes.filePath, gitattributes.body)
}

export const initPackageJson = async (appName: string) => {
  try {
    const filePath = `./${appName}/package.json`
    const packageJson = fs.readFileSync(filePath)
    const newPackageJson = JSON.parse(String(packageJson))
    newPackageJson.name = appName
    newPackageJson.version = '0.0.1'
    newPackageJson.description = `Full-stack Serverless Framework Skeet ${appName} App`
    fs.writeFileSync(filePath, JSON.stringify(newPackageJson, null, 2))
  } catch (error) {
    throw new Error(`initPackageJson: ${error}`)
  }
}

export const initAppJson = async (appName: string) => {
  const appDir = './' + appName
  const filePath = `${appDir}/app.json`
  const appJson = fs.readFileSync(filePath)
  const newAppJson = JSON.parse(String(appJson))
  newAppJson.name = appName
  newAppJson.slug = appName
  newAppJson.schema = appName
  newAppJson.owner = 'skeet'
  fs.writeFileSync(filePath, JSON.stringify(newAppJson, null, 2))
  Logger.successCheck('Successfully Updated ./app.json')
}
