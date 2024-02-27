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
import { updatePackageJsonName } from '@/lib/files/updatePackageJsonName'
import { functionsYml } from '@/templates/init'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { existsSync, mkdir, mkdirSync, readFileSync, writeFileSync } from 'fs'

export const addFunctions = (functionName: string) => {
  try {
    const skeetConfig: SkeetCloudConfig = importConfig()
    const functionDir = FUNCTIONS_PATH + `/${functionName}`
    if (existsSync(functionDir)) {
      Logger.error(`Already exist functionName: ${functionName}!`)
      return ''
    } else {
      mkdirSync(functionDir, { recursive: true })

      const gitCloneCmd = ['git', 'clone', FUNCTIONS_REPO_URL, functionDir]
      execSyncCmd(gitCloneCmd)
      const rmDefaultGit = ['rm', '-rf', '.git', '.github']
      execSyncCmd(rmDefaultGit, functionDir)
      addProjectRegionToSkeetOptions(
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

      updateFirebaseConfig(functionName)
      updatePackageJsonName(
        functionName + '-func',
        functionDir + '/package.json',
      )
      addFunctionsToPackageJson(functionName)
      const githubAction = functionsYml(functionName)
      writeFileSync(githubAction.filePath, githubAction.body)
    }
  } catch (error) {
    throw new Error(`Error in addFunctions: ${error}`)
  }
}

export const updateFirebaseConfig = (functionName: string) => {
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

export const addFunctionsToPackageJson = (functionName: string) => {
  const packageJson = readFileSync(ROUTE_PACKAGE_JSON_PATH)
  const newPackageJson = JSON.parse(String(packageJson))
  newPackageJson.scripts[`skeet:${functionName}`] =
    `pnpm -F ${functionName}-func dev`
  writeFileSync(
    ROUTE_PACKAGE_JSON_PATH,
    JSON.stringify(newPackageJson, null, 2),
  )
  Logger.successCheck('Successfully Updated ./package.json')
}
