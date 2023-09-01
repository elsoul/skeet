import { DEFAULT_FUNCTION_NAME, SKEET_CONFIG_PATH } from '@/index'
import { execSyncCmd, importConfig } from '@/lib'
import { SkeetCloudConfig, SkeetOptions } from '@/types/skeetTypes'
import { readFileSync, writeFileSync } from 'fs'

export const firebaseFunctionsDeploy = async (
  projectId: string,
  functionName: string = DEFAULT_FUNCTION_NAME
) => {
  try {
    const shCmd = [
      'firebase',
      'deploy',
      '--only',
      `functions:${functionName}`,
      '-P',
      `${projectId}`,
    ]
    await execSyncCmd(shCmd)
    const skeetConfig: SkeetCloudConfig = await importConfig()
    if (!skeetConfig.app.hasLoadBalancer) {
      await updateFunctionsUrl(skeetConfig, functionName)
    }
  } catch (error) {
    throw new Error(`firebaseFunctionsDeploy: ${error}`)
  }
}

const updateFunctionsUrl = async (
  skeetConfig: SkeetCloudConfig,
  functionName: string
) => {
  const functionsDomain = `${skeetConfig.app.region}-${skeetConfig.app.fbProjectId}.cloudfunctions.net`
  const skeetOptionsFile = `./functions/${functionName}/skeetOptions.json`
  const jsonFile = readFileSync(skeetOptionsFile)
  const newJsonFile: SkeetOptions = JSON.parse(String(jsonFile))
  newJsonFile.functionsDomain = functionsDomain
  writeFileSync(skeetOptionsFile, JSON.stringify(newJsonFile, null, 2))

  skeetConfig.app.functionsDomain = functionsDomain
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  return functionsDomain
}
