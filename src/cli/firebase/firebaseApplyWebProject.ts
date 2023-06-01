import { execSync } from 'child_process'

export const firebaseApplyWebProject = async (appDisplayName: string) => {
  try {
    const shCmd = ['firebase', 'target:apply', 'hosting', appDisplayName, 'WEB']
    execSync(shCmd.join(' '))
    return true
  } catch (error) {
    throw new Error(`firebaseApplyWebProject: ${error}`)
  }
}
