import {
  createServiceAccount,
  createServiceAccountKey,
  runAddAllRole,
  runEnableAllPermission,
  setGcloudProject,
  addJsonEnv,
} from '@/cli'
import { KEYFILE_PATH } from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { sleep } from '@/utils/time'
import { rmSync } from 'fs'
export const setupGcp = async (config: SkeetCloudConfig, region: string) => {
  const spinner = await Logger.syncSpinner('Setting up GCP...')
  await setGcloudProject(config.app.projectId)
  await runEnableAllPermission(config.app.projectId)
  await createServiceAccount(config.app.projectId, config.app.name)
  await createServiceAccountKey(config.app.projectId, config.app.name)
  await sleep(2000)
  await addJsonEnv()
  await sleep(2000)
  rmSync(KEYFILE_PATH)
  await runAddAllRole(config.app.projectId, config.app.name)
  spinner.stop()
}
