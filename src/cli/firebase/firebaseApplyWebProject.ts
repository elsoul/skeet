import { execSync } from 'child_process'

export const firebaseApplyWebProject = async (appId: string) => {
  try {
    const shCmd = ['firebase', 'target:apply', 'hosting', appId, 'web']
    execSync(shCmd.join(' '))
    return true
  } catch (error) {
    throw new Error(`firebaseApplyWebProject: ${error}`)
  }
}
