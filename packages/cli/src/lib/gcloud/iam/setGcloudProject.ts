import { execSync } from 'child_process'

export const setGcloudProject = (projectId: string) => {
  try {
    const shCmd = ['gcloud', 'config', 'set', 'project', projectId]
    execSync(shCmd.join(' '), { stdio: 'ignore' })
  } catch (error) {
    throw new Error(`setGcloudProject: ${error}`)
  }
}
