import {
  addBackend,
  createBackend,
  createNeg,
  updateBackend,
  importConfig,
  isNegExists,
} from '@/lib'
import { convertToKebabCase } from '@/utils/string'

export const addBackendSetup = (methodName: string) => {
  try {
    const config = importConfig()
    const kebab = convertToKebabCase(methodName)
    const isNeg = isNegExists(config.app.projectId, config.app.region, kebab)
    if (isNeg) return { status: 'skip' }

    createNeg(config.app.projectId, methodName, config.app.region)
    createBackend(config.app.projectId, kebab)
    addBackend(config.app.projectId, config.app.name, kebab, config.app.region)
    updateBackend(config.app.projectId, config.app.name, kebab)
    return { status: 'success' }
  } catch (error) {
    throw new Error(`addBackendSetup: ${error}`)
  }
}
