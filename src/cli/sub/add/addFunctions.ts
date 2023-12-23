import {
  Logger,
  FIREBASE_CONFIG_PATH,
  FUNCTIONS_PATH,
  FUNCTIONS_REPO_URL,
  ROUTE_PACKAGE_JSON_PATH,
  execSyncCmd,
  importConfig,
  importFirebaseConfig,
} from '@/lib'
import {
  addDomainToConfig,
  addProjectRegionToSkeetOptions,
} from '@/lib/files/addJson'
import { functionsYml } from '@/templates/init'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { existsSync, mkdir, readFileSync, writeFileSync } from 'fs'

export const addFunctions = async (functionName: string) => {
  try {
    const skeetConfig: SkeetCloudConfig = importConfig()
    const functionDir = FUNCTIONS_PATH + `/${functionName}`
    if (existsSync(functionDir)) {
      Logger.error(`Already exist functionName: ${functionName}!`)
      return ''
    } else {
      mkdir(functionDir, { recursive: true }, (err) => {
        if (err) throw err
      })

      const gitCloneCmd = ['git', 'clone', FUNCTIONS_REPO_URL, functionDir]
      execSyncCmd(gitCloneCmd)
      const rmDefaultGit = ['rm', '-rf', '.git']
      execSyncCmd(rmDefaultGit, functionDir)
      await addProjectRegionToSkeetOptions(
        skeetConfig.app.region,
        skeetConfig.app.projectId,
        skeetConfig.app.fbProjectId,
        functionName,
      )
      await addDomainToConfig(
        skeetConfig.app.appDomain,
        skeetConfig.app.nsDomain,
        skeetConfig.app.lbDomain,
        functionName,
      )

      await updateFirebaseConfig(functionName)
      await addFunctionsToPackageJson(functionName)
      const githubAction = await functionsYml(functionName)
      writeFileSync(githubAction.filePath, githubAction.body)
    }
  } catch (error) {
    throw new Error(`Error in addFunctions: ${error}`)
  }
}

export const updateFirebaseConfig = async (functionName: string) => {
  const firebaseConfig = importFirebaseConfig()
  const newFunction = {
    source: `functions/${functionName}`,
    codebase: functionName,
    ignore: [
      'node_modules',
      '.git',
      'firebase-debug.log',
      'firebase-debug.*.log',
    ],
  }
  firebaseConfig.functions.push(newFunction)
  writeFileSync(FIREBASE_CONFIG_PATH, JSON.stringify(firebaseConfig, null, 2))
  Logger.successCheck('Successfully Updated firebase.json')
}

export const addFunctionsToPackageJson = async (functionName: string) => {
  const packageJson = readFileSync(ROUTE_PACKAGE_JSON_PATH)
  const newPackageJson = JSON.parse(String(packageJson))
  newPackageJson.scripts[`skeet:${functionName}`] =
    `yarn --cwd ./functions/${functionName} dev`
  writeFileSync(
    ROUTE_PACKAGE_JSON_PATH,
    JSON.stringify(newPackageJson, null, 2),
  )
  Logger.successCheck('Successfully Updated ./package.json')
}
