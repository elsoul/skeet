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
  await setGcloudProject(config.app.projectId)
  await runEnableAllPermission(config.app.projectId)
  await createServiceAccount(config.app.projectId, config.app.name)
  await createServiceAccountKey(config.app.projectId, config.app.name)
  await runAddAllRole(config.app.projectId, config.app.name)
}
