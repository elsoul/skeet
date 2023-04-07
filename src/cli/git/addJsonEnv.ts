import { execSync } from 'node:child_process'
import { KEYFILE_PATH } from '@/lib/getSkeetConfig'

export const addJsonEnv = async () => {
  const cmdLine = `gh secret set KINPACHI_GCP_SA_KEY < ${KEYFILE_PATH}`
  execSync(cmdLine)
}
