import {
  createServiceAccount,
  createServiceAccountKey,
  dockerLogin,
  runAddAllRole,
  runEnableAllPermission,
  runVpcNat,
  setGcloudProject,
  addJsonEnv,
} from '@/cli'
import { SkeetCloudConfig } from '@/index'
import { KEYFILE_PATH } from '@/lib/getSkeetConfig'
import { sleep } from '@/utils/time'
import fs from 'fs'
export const setupGcp = async (config: SkeetCloudConfig) => {
  await setGcloudProject(config.app.projectId)
  await runEnableAllPermission(config.app.projectId)
  await createServiceAccount(config.app.projectId, config.app.name)
  await createServiceAccountKey(config.app.projectId, config.app.name)
  await sleep(2000)
  await addJsonEnv()
  await sleep(2000)
  fs.rmSync(KEYFILE_PATH)
  await runAddAllRole(config.app.projectId, config.app.name)
  await runVpcNat(config.app.projectId, config.app.name, config.app.region)
}
