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
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { updatePackageJsonName } from '@/lib/files/updatePackageJsonName'
import { functionsYml } from '@/templates/init'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { mkdir, readFile, writeFile } from 'fs/promises'

export const addFunctions = async (functionName: string) => {
  try {
    const skeetConfig: SkeetCloudConfig = await importConfig()
    const functionDir = FUNCTIONS_PATH + `/${functionName}`
    if (await checkFileDirExists(functionDir)) {
      Logger.error(`Already exist functionName: ${functionName}!`)
      return ''
    } else {
      await mkdir(functionDir, { recursive: true })

      const gitCloneCmd = ['git', 'clone', FUNCTIONS_REPO_URL, functionDir]
      execSyncCmd(gitCloneCmd)
      const rmDefaultGit = ['rm', '-rf', '.git', '.github']
      execSyncCmd(rmDefaultGit, functionDir)
      await addProjectRegionToSkeetOptions(
        skeetConfig.app.region,
        skeetConfig.app.projectId,
        skeetConfig.app.fbProjectId,
        functionName,
      )
      addDomainToConfig(
        skeetConfig.app.appDomain,
        skeetConfig.app.nsDomain,
        skeetConfig.app.lbDomain,
        functionName,
      )

      await updateFirebaseConfig(functionName)
      updatePackageJsonName(
        functionName + '-func',
        functionDir + '/package.json',
      )
      await addFunctionsToPackageJson(functionName)
      const githubAction = await functionsYml(functionName)
      await writeFile(githubAction.filePath, githubAction.body)
    }
  } catch (error) {
    throw new Error(`Error in addFunctions: ${error}`)
  }
}

export const updateFirebaseConfig = async (functionName: string) => {
  const firebaseConfig = await importFirebaseConfig()
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
  await writeFile(FIREBASE_CONFIG_PATH, JSON.stringify(firebaseConfig, null, 2))
  Logger.successCheck('Successfully Updated firebase.json')
}

export const addFunctionsToPackageJson = async (functionName: string) => {
  const packageJson = await readFile(ROUTE_PACKAGE_JSON_PATH)
  const newPackageJson = JSON.parse(String(packageJson))
  newPackageJson.scripts[`skeet:${functionName}`] =
    `pnpm -F ${functionName}-func dev`
  await writeFile(
    ROUTE_PACKAGE_JSON_PATH,
    JSON.stringify(newPackageJson, null, 2),
  )
  Logger.successCheck('Successfully Updated ./package.json')
}
