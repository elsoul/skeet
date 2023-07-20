import { execSync } from 'node:child_process'
import { KEYFILE_PATH } from '@/lib'

export const addJsonEnv = async () => {
  const cmdLine = `gh secret set SKEET_GCP_SA_KEY < ${KEYFILE_PATH}`
  execSync(cmdLine)
}
