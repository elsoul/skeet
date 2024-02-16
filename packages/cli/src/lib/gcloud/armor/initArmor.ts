import {
  importConfig,
  updateBackendSecurityPolicy,
  updateSecurityPolicy,
  Logger,
} from '@/lib'

export const initArmor = () => {
  try {
    const config = importConfig()
    updateBackendSecurityPolicy(config.app.projectId, config.app.name)
    updateSecurityPolicy(config.app.projectId, config.app.name)
    Logger.success(`successfully created Cloud Armor!`)
    return true
  } catch (error) {
    throw new Error(`initArmor failed: ${error}`)
  }
}
