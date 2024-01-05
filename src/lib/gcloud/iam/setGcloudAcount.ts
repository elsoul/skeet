import { execSync } from 'child_process'

export const setGcloudAcount = async (acount: string) => {
  try {
    const shCmd = ['gcloud', 'config', 'set', 'acount', acount]
    execSync(shCmd.join(' '), { stdio: 'ignore' })
  } catch (error) {
    throw new Error(`setGcloudAcount: ${error}`)
  }
}
