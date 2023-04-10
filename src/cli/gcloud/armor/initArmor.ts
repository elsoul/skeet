import { importConfig } from '@/index'
import { Logger } from '@/lib/logger'
import {
  createSecurityPolicy,
  updateBackendSecurityPolicy,
  updateSecurityPolicy,
} from '@/cli'

export const initArmor = async (projectId: string, appName: string) => {
  const config = await importConfig()
  await createSecurityPolicy(config.app.projectId, config.app.name)
  await updateBackendSecurityPolicy(config.app.projectId, config.app.name)
  await updateSecurityPolicy(config.app.projectId, config.app.name)
  await Logger.success(`successfully created Cloud Armor!`)
}
