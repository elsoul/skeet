import {
  addBackend,
  createBackend,
  createNeg,
  updateBackend,
  importConfig,
  isNegExists,
  getNetworkConfig,
} from '@/lib'
import { convertToKebabCase } from '@/utils/string'

export const addBackendSetup = (
  methodName: string,
  securityPolicyName?: string | null,
) => {
  try {
    const config = importConfig()
    const kebab = convertToKebabCase(methodName)
    const isNeg = isNegExists(config.app.projectId, config.app.region, kebab)
    if (isNeg) return { status: 'skip' }

    createNeg(config.app.projectId, methodName, config.app.region)
    createBackend(config.app.projectId, kebab)
    addBackend(config.app.projectId, config.app.name, kebab, config.app.region)
    let securityPolicyNameValue = getNetworkConfig(
      config.app.projectId,
      config.app.name,
    ).securityPolicyName
    if (securityPolicyName) {
      securityPolicyNameValue = securityPolicyName
    }
    updateBackend(config.app.projectId, securityPolicyNameValue, kebab)
    return { status: 'success' }
  } catch (error) {
    throw new Error(`addBackendSetup: ${error}`)
  }
}
