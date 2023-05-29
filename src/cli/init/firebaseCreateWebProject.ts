import { execSync } from 'child_process'

export const firebaseCreateWebProject = async (projectId: string) => {
  try {
    const shCmd = ['firebase', 'apps:create', 'web', projectId]
    execSync(shCmd.join(' '))
    return true
  } catch (error) {
    throw new Error(`firebaseCreateWebProject: ${error}`)
  }
}
