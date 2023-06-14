import { execSyncCmd } from '@/lib/execSyncCmd'

export const firebaseFunctionsDeploy = async (
  projectId: string,
  functionName: string = 'openai'
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
