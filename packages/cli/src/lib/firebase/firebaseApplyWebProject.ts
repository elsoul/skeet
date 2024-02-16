import { spawnSync } from 'child_process'

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
    spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`firebaseApplyWebProject: ${error}`)
  }
}
