import { execSync } from 'child_process'

export const setGcloudAccount = async (account: string) => {
  try {
    const shCmd = ['gcloud', 'config', 'set', 'account', account]
    execSync(shCmd.join(' '), { stdio: 'ignore' })
  } catch (error) {
    throw new Error(`setGcloudAccount: ${error}`)
  }
}
