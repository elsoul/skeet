import { AiConfig, SkeetCloudConfig, SkeetOptions } from '@/types/skeetTypes'
import { importConfig } from './importConfig'
import { readFileSync, writeFileSync } from 'fs'
import { FUNCTIONS_PATH, SKEET_CONFIG_PATH } from './getSkeetConfig'
import { Logger } from '../logger'
import { copyFileWithOverwrite } from './copyFiles'
import { askForProjectIdAndRegion } from '@/cli'
import { DEFAULT_FUNCTION_NAME } from '@/index'

export const addDomainToConfig = async (
  appDomain: string,
  nsDomain: string,
  lbDomain: string,
  functionName: string,
) => {
  const skeetConfig: SkeetCloudConfig = importConfig()
  const skeetOptionsFile = `./functions/${functionName}/skeetOptions.json`
  const jsonFile = readFileSync(skeetOptionsFile)
  const newJsonFile: SkeetOptions = JSON.parse(String(jsonFile))
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
  functionName: string,
) => {
  const skeetConfig: SkeetCloudConfig = importConfig()

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
  ai: AiConfig
}

export const addProjectRegionToSkeetConfig = async () => {
  const { projectId, region } = await askForProjectIdAndRegion()
  const skeetConfigMin: SkeetConfigMin = {
    app: {
      name: projectId,
      projectId,
      region,
    },
    ai: {
      lang: 'en',
      ais: [
        {
          name: 'VertexAI',
          availableModels: ['chat-bison@001'],
        },
      ],
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
    const defaultFirebaseTsConfigPath = `./lib/firebaseConfig.ts`
    const functionsTsConfigPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/firebaseConfig.ts`
    await copyFileWithOverwrite(
      originalFirebaseConfigPath,
      defaultFirebaseTsConfigPath,
    )
    await copyFileWithOverwrite(
      originalFirebaseConfigPath,
      functionsTsConfigPath,
    )
  } catch (error) {
    throw new Error(`Error copying default firebase config: ${error}`)
  }
}
