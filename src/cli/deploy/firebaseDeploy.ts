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
  } catch (error) {
    throw new Error(`firebaseFunctionsDeploy: ${error}`)
  }
}
