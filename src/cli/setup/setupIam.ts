import {
  createServiceAccount,
  createServiceAccountKey,
  runAddAllRole,
  runEnableAllPermission,
  setGcloudProject,
} from '@/cli'
import { importConfig, SkeetCloudConfig } from '@/index'

export const setupIam = async () => {
  const config: SkeetCloudConfig = await importConfig()
  await setGcloudProject(config.api.projectId)
  await runEnableAllPermission(config.api.projectId)
  await createServiceAccount(config.api.projectId, config.api.appName)
  await createServiceAccountKey(config.api.projectId, config.api.appName)
  await runAddAllRole(config.api.projectId, config.api.appName)
}
