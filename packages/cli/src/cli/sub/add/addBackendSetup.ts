import { importConfig } from '@/lib/files/importConfig'
import { getNetworkConfig, isNegExists } from '@/lib/files/getSkeetConfig'
import { updateBackend } from '@/lib/gcloud/lb/updateBackend'
import { createNeg } from '@/lib/gcloud/lb/createNeg'
import { createBackend } from '@/lib/gcloud/lb/createBackend'
import { addBackend } from '@/lib/gcloud/lb/addBackend'
import { convertToKebabCase } from '@/utils/string'

export const addBackendSetup = async (
  methodName: string,
  securityPolicyName?: string | null,
) => {
  try {
    const config = await importConfig()
    const kebab = convertToKebabCase(methodName)
    const isNeg = await isNegExists(
      config.app.projectId,
      config.app.region,
      kebab,
    )
    if (isNeg) return { status: 'skip' }

    await createNeg(config.app.projectId, methodName, config.app.region)
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
