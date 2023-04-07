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
  await setGcloudProject(config.api.projectId)
  await runEnableAllPermission(config.api.projectId)
  await createServiceAccount(config.api.projectId, config.api.appName)
  await createServiceAccountKey(config.api.projectId, config.api.appName)
  await sleep(2000)
  await addJsonEnv()
  await sleep(2000)
  await dockerLogin()
  await sleep(2000)
  fs.rmSync(KEYFILE_PATH)
  await runAddAllRole(config.api.projectId, config.api.appName)
  await runVpcNat(config.api.projectId, config.api.appName, config.api.region)
}
