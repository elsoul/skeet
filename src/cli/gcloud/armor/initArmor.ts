import { importConfig } from '@/index'
import { Logger } from '@/lib/logger'
import { updateBackendSecurityPolicy, updateSecurityPolicy } from '@/cli'

export const initArmor = async () => {
  try {
    const config = await importConfig()
    await updateBackendSecurityPolicy(config.app.projectId, config.app.name)
    await updateSecurityPolicy(config.app.projectId, config.app.name)
    Logger.success(`successfully created Cloud Armor!`)
    return true
  } catch (error) {
    throw new Error(`initArmor failed: ${error}`)
  }
}
