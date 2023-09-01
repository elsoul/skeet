import {
  Logger,
  importConfig,
  SKEET_CONFIG_PATH,
  getNetworkConfig,
  getFunctions,
  createRecord,
} from '@/lib'
import { readFileSync, writeFileSync } from 'fs'

export const addWebAppDomain = async (appDomain: string, ip: string) => {
  try {
    const skeetConfig = importConfig()
    const { zoneName } = await getNetworkConfig(
      skeetConfig.app.projectId,
      skeetConfig.app.name
    )
    await createRecord(skeetConfig.app.projectId, zoneName, appDomain, ip)
    await addAppDomainToSkeetConfig(appDomain)
    const functions = await getFunctions()
    for (const func of functions) {
      await addAppNameToSkeetOptions(skeetConfig.app.name, func)
    }
  } catch (error) {
    throw new Error(`addWebAppDomain: ${error}`)
  }
}

const addAppDomainToSkeetConfig = async (appDomain: string) => {
  try {
    const appJson = readFileSync(SKEET_CONFIG_PATH)
    const newAppJson = JSON.parse(String(appJson))
    newAppJson.app.appDomain = appDomain
    writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(newAppJson, null, 2))
    Logger.successCheck(`Successfully Updated ${SKEET_CONFIG_PATH}`)
  } catch (error) {
    throw new Error(`addAppDomainToSkeetConfig: ${error}`)
  }
}

const addAppNameToSkeetOptions = async (
  appName: string,
  functionName: string
) => {
  try {
    const filePath = `./functions/${functionName}/skeetOptions.json`
    const jsonFile = readFileSync(filePath)
    const skeetOptions = JSON.parse(String(jsonFile))
    skeetOptions.name = appName
    writeFileSync(filePath, JSON.stringify(skeetOptions, null, 2))
  } catch (error) {
    throw new Error(`addAppNameToSkeetOptions: ${error}`)
  }
}
