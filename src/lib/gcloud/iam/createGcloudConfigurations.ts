import { execSync } from 'child_process'

export const createGcloudConfigurations = async (profile: string) => {
  try {
    const shCmd = ['gcloud', 'config', 'configurations', 'create', profile]
    execSync(shCmd.join(' '), { stdio: 'ignore' })
  } catch (error) {
    throw new Error(`createGcloudConfigurations: ${error}`)
  }
}
