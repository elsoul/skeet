import { execSyncCmd } from '@/lib'

export const firebaseFunctionsDeploy = async (
  projectId: string,
  functionName: string = 'skeet'
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
