import { execSync } from 'node:child_process'
import { KEYFILE_PATH, createServiceAccountKey } from '@/lib'
import { existsAsync } from '@skeet-framework/utils'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const addJsonEnv = async () => {
  if (!(await existsAsync(KEYFILE_PATH))) {
    const config = await readOrCreateConfig()
    await createServiceAccountKey(config.app.projectId, config.app.name)
  }
  const cmdLine = `gh secret set SKEET_GCP_SA_KEY < ${KEYFILE_PATH}`
  execSync(cmdLine)
}
