import { execSyncCmd } from '@/lib/execSyncCmd'

export const deployRules = async (projectId: string) => {
  try {
    const shCmd = [
      'firebase',
      'deploy',
      '--only',
      'firestore:rules',
      '--project',
      `${projectId}`,
    ]
    await execSyncCmd(shCmd)
    return true
  } catch (error) {
    throw new Error(`deployRules: ${error}`)
  }
}
