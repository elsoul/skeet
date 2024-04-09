import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import {
  updateBackendSecurityPolicy,
  updateSecurityPolicy,
  Logger,
} from '@/lib'

export const initArmor = async () => {
  try {
    const config = await readOrCreateConfig()
    await updateBackendSecurityPolicy(config.app.projectId, config.app.name)
    await updateSecurityPolicy(config.app.projectId, config.app.name)
    Logger.success(`successfully created Cloud Armor!`)
    return true
  } catch (error) {
    throw new Error(`initArmor failed: ${error}`)
  }
}
