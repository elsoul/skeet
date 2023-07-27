import { SkeetCloudConfig } from '@/types/skeetTypes'
import { importConfig } from './importConfig'
import { readFileSync, writeFileSync } from 'fs'
import { SKEET_CONFIG_PATH } from './getSkeetConfig'
import { Logger } from '../logger'
import { copyFileWithOverwrite } from './copyFiles'

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
  newJsonFile.nsDomain = nsDomain
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

export const addAppJson = (repoName: string) => {
  const filePath = `./app.json`
  const appJson = readFileSync(filePath)
  const newAppJson = JSON.parse(String(appJson))
  newAppJson.expo.githubUrl = `https://github.com/${repoName}`
  writeFileSync(filePath, JSON.stringify(newAppJson, null, 2))
  Logger.successCheck(`Successfully Updated ${filePath}`)
}

export const copyDefaultFirebaseConfig = async (appDisplayName: string) => {
  const originalFirebaseConfigPath = `./lib/firebaseAppConfig/${appDisplayName}.mjs`
  const defaultFirebaseConfigPath = `./lib/firebaseConfig.mjs`
  await copyFileWithOverwrite(
    originalFirebaseConfigPath,
    defaultFirebaseConfigPath
  )
}
