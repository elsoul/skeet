import { SkeetOptions } from '@/types/skeetTypes'
import { readFile, writeFile } from 'fs/promises'
import { FUNCTIONS_PATH, SKEET_CONFIG_PATH } from './getSkeetConfig'
import { Logger } from '../logger'
import { copyFileWithOverwrite } from './copyFiles'
import { askForProjectIdAndRegion } from '@/cli/init/askQuestions'
import { DEFAULT_FUNCTION_NAME } from '@/index'
import { SkeetCloudConfig, defaultSkeetCloudConfig } from '@/config/skeetCloud'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const addDomainToConfig = async (
  appDomain: string,
  nsDomain: string,
  lbDomain: string,
  functionName: string,
) => {
  const skeetConfig: SkeetCloudConfig = await readOrCreateConfig()
  const skeetOptionsFile = `./functions/${functionName}-func/skeetOptions.json`
  const jsonFile = await readFile(skeetOptionsFile)
  const newJsonFile: SkeetOptions = JSON.parse(String(jsonFile))
  newJsonFile.appDomain = appDomain

  await writeFile(skeetOptionsFile, JSON.stringify(newJsonFile, null, 2))

  skeetConfig.app.nameServerDomain = nsDomain
  skeetConfig.app.loadBalancerDomain = lbDomain
  skeetConfig.app.appDomains.push({
    name: appDomain,
    domain: appDomain,
  })
  await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.successCheck('Successfully Updated skeet-cloud.config.json!')
}

export const addProjectRegionToSkeetOptions = async (
  region: string,
  projectId: string,
  functionName: string,
) => {
  try {
    const skeetConfig: SkeetCloudConfig = await readOrCreateConfig()

    skeetConfig.app.region = region
    skeetConfig.app.projectId = projectId
    const filePath = `./functions/${functionName}-func/skeetOptions.json`
    const jsonFile = await readFile(filePath)
    const newJsonFile = JSON.parse(String(jsonFile))
    newJsonFile.name = skeetConfig.app.name
    newJsonFile.projectId = skeetConfig.app.projectId
    newJsonFile.region = skeetConfig.app.region
    await writeFile(filePath, JSON.stringify(newJsonFile, null, 2))
    await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
    Logger.successCheck('Successfully Updated skeet-cloud.config.json')
  } catch (error) {
    throw new Error(`addProjectRegionToSkeetOptions: ${error}`)
  }
}

export const addProjectRegionToSkeetConfig = async () => {
  const { projectId, region } = await askForProjectIdAndRegion()
  const skeetConfig: SkeetCloudConfig = defaultSkeetCloudConfig
  skeetConfig.app.projectId = projectId
  skeetConfig.app.region = region
  await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.successCheck('Successfully created ./skeet-cloud.config.json')
}

export const addAppJson = async (repoName: string) => {
  const filePath = `./app.json`
  const appJson = await readFile(filePath)
  const newAppJson = JSON.parse(String(appJson))
  newAppJson.expo.githubUrl = `https://github.com/${repoName}`
  await writeFile(filePath, JSON.stringify(newAppJson, null, 2))
  Logger.successCheck(`Successfully Updated ${filePath}`)
}

export const copyDefaultFirebaseConfig = async (appDisplayName: string) => {
  try {
    const originalFirebaseConfigPath = `./lib/firebaseAppConfig/${appDisplayName}.ts`
    const defaultFirebaseTsConfigPath = `./lib/firebaseConfig.ts`
    const functionsTsConfigPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}-func/src/lib/firebaseConfig.ts`
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
