import { importConfig } from '@/index'
import { Logger } from '@/lib/logger'
import {
  createSecurityPolicy,
  updateBackendSecurityPolicy,
  updateSecurityPolicy,
} from '@/cli'

export const initArmor = async (projectId: string, appName: string) => {
  const config = await importConfig()
  await createSecurityPolicy(config.api.projectId, config.api.appName)
  await updateBackendSecurityPolicy(config.api.projectId, config.api.appName)
  await updateSecurityPolicy(config.api.projectId, config.api.appName)
  await Logger.success(`successfully created Cloud Armor!`)
}
