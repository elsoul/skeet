import { DEFAULT_FUNCTION_NAME } from '@/index'
import { execSyncCmd } from '@/lib'

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
