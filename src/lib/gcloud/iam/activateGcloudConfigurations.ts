import { execSync } from 'child_process'

export const activateGcloudConfigurations = async (profile: string) => {
  try {
    const shCmd = ['gcloud', 'config', 'configurations', 'activate', profile]
    execSync(shCmd.join(' '), { stdio: 'ignore' })
  } catch (error) {
    throw new Error(`activateGcloudConfigurations: ${error}`)
  }
}
