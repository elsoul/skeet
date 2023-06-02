import { execSync } from 'child_process'

export const firebaseApplyWebProject = async (
  projectId: string,
  appDisplayName: string
) => {
  try {
    const shCmd = [
      'firebase',
      'target:apply',
      'hosting',
      projectId,
      appDisplayName,
    ]
    execSync(shCmd.join(' '))
    return true
  } catch (error) {
    throw new Error(`firebaseApplyWebProject: ${error}`)
  }
}
