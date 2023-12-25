import { dockerLogin } from '@/cli/sub/docker/dockerLogin'
import {
  createServiceAccount,
  createServiceAccountKey,
  runAddAllRole,
  runEnableAllPermission,
  setGcloudProject,
  addJsonEnv,
  KEYFILE_PATH,
  Logger,
} from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { sleep } from '@/utils/time'
import { rmSync } from 'fs'

export const setupGcp = async (config: SkeetCloudConfig, region: string) => {
  const spinner = await Logger.syncSpinner('Setting up GCP...')
  setGcloudProject(config.app.projectId)
  await runEnableAllPermission(config.app.projectId)
  await createServiceAccount(config.app.projectId, config.app.name)
  await createServiceAccountKey(config.app.projectId, config.app.name)
  await sleep(2000)
  await addJsonEnv()
  await dockerLogin()
  await sleep(2000)
  rmSync(KEYFILE_PATH)
  await runAddAllRole(config.app.projectId, config.app.name)
  spinner.stop()
}
