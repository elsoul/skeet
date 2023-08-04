import { SkeetCloudConfig } from '@/types/skeetTypes'
import { importConfig } from './importConfig'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { SKEET_CONFIG_PATH } from './getSkeetConfig'
import { Logger } from '../logger'
import { copyFileWithOverwrite } from './copyFiles'
import { askForProjectIdAndRegion } from '@/cli'

export const addDomainToConfig = async (
  appDomain: string,
  nsDomain: string,
  lbDomain: string,
  functionName: string
) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  const skeetOptionsFile = `./functions/${functionName}/skeetOptions.json`
  const jsonFile = readFileSync(skeetOptionsFile)
  const newJsonFile = JSON.parse(String(jsonFile))
  newJsonFile.appDomain = appDomain
  newJsonFile.nsDomain = nsDomain
  newJsonFile.lbDomain = lbDomain
  writeFileSync(skeetOptionsFile, JSON.stringify(newJsonFile, null, 2))

  skeetConfig.app.appDomain = appDomain
  skeetConfig.app.nsDomain = nsDomain
  skeetConfig.app.lbDomain = lbDomain
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.success('Successfully Updated skeet-cloud.config.json!')
}

export const addProjectRegionToSkeetOptions = async (
  region: string,
  projectId: string,
  fbProjectId: string,
  functionName: string
) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()

  skeetConfig.app.region = region
  skeetConfig.app.projectId = projectId
  skeetConfig.app.fbProjectId = fbProjectId
  if (skeetConfig.taskQueues.length !== 0) {
    skeetConfig.taskQueues[0].location = region
    skeetConfig.taskQueues[1].location = region
  }
  const filePath = `./functions/${functionName}/skeetOptions.json`
  const jsonFile = readFileSync(filePath)
  const newJsonFile = JSON.parse(String(jsonFile))
  newJsonFile.name = skeetConfig.app.name
  newJsonFile.projectId = skeetConfig.app.projectId
  newJsonFile.fbProjectId = skeetConfig.app.fbProjectId
  newJsonFile.region = skeetConfig.app.region
  writeFileSync(filePath, JSON.stringify(newJsonFile, null, 2))
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.successCheck('Successfully Updated skeet-cloud.config.json')
}

export type SkeetConfigMin = {
  app: {
    name: string
    projectId: string
    region: string
  }
}

export const addProjectRegionToSkeetConfig = async () => {
  if (existsSync(SKEET_CONFIG_PATH))
    throw new Error('skeet-cloud.config.json already exists')

  const { projectId, region } = await askForProjectIdAndRegion()
  const skeetConfigMin: SkeetConfigMin = {
    app: {
      name: projectId,
      projectId,
      region,
    },
  }
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfigMin, null, 2))
  Logger.successCheck('Successfully created ./skeet-cloud.config.json')
}

export const addAppJson = (repoName: string) => {
  const filePath = `./app.json`
  const appJson = readFileSync(filePath)
  const newAppJson = JSON.parse(String(appJson))
  newAppJson.expo.githubUrl = `https://github.com/${repoName}`
  writeFileSync(filePath, JSON.stringify(newAppJson, null, 2))
  Logger.successCheck(`Successfully Updated ${filePath}`)
}

export const copyDefaultFirebaseConfig = async (appDisplayName: string) => {
  try {
    const originalFirebaseConfigPath = `./lib/firebaseAppConfig/${appDisplayName}.ts`
    const defaultFirebaseConfigPath = `./lib/firebaseConfig.mjs`
    const defaultFirebaseTsConfigPath = `./lib/firebaseConfig.ts`
    await copyFileWithOverwrite(
      originalFirebaseConfigPath,
      defaultFirebaseConfigPath
    )
    await copyFileWithOverwrite(
      originalFirebaseConfigPath,
      defaultFirebaseTsConfigPath
    )
  } catch (error) {
    throw new Error(`Error copying default firebase config: ${error}`)
  }
}
