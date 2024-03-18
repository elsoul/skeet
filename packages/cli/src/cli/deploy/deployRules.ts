import { execAsyncCmd } from '@/lib/execAsyncCmd'

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
    execAsyncCmd(shCmd)
    return true
  } catch (error) {
    throw new Error(`deployRules: ${error}`)
  }
}
