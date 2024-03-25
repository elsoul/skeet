import { getNetworkConfig, isNegExists } from '@/lib/files/getSkeetConfig'
import { updateBackend } from '@/lib/gcloud/lb/updateBackend'
import { createNeg } from '@/lib/gcloud/lb/createNeg'
import { createBackend } from '@/lib/gcloud/lb/createBackend'
import { addBackend } from '@/lib/gcloud/lb/addBackend'
import { convertToKebabCase } from '@/utils/string'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import chalk from 'chalk'
import { addPathMatcher, createFr } from '@/lib'

export const addBackendSetup = async (
  methodName: string,
  securityPolicyName?: string | null,
) => {
  try {
    const config = await readOrCreateConfig()
    const kebab = convertToKebabCase(methodName)
    const isNeg = await isNegExists(
      config.app.projectId,
      config.app.region,
      kebab,
    )

    if (isNeg) {
      console.log(chalk.white(`✔️ Already Setup: ${kebab}`))
      return { status: 'skip' }
    }

    console.log(chalk.white(`✅ Creating NEG: ${kebab}`))
    await createNeg(config.app.projectId, methodName, config.app.region)

    console.log(chalk.white(`✅ Creating backend: ${kebab}`))
    await createBackend(config.app.projectId, kebab)

    console.log(chalk.white(`✅ Adding backend: ${kebab}`))
    await addBackend(
      config.app.projectId,
      config.app.name,
      kebab,
      config.app.region,
    )
    let securityPolicyNameValue = getNetworkConfig(
      config.app.projectId,
      config.app.name,
    ).securityPolicyName
    if (securityPolicyName) {
      securityPolicyNameValue = securityPolicyName
    }

    console.log(chalk.white(`✅ Updating backend: ${kebab}`))
    await updateBackend(config.app.projectId, securityPolicyNameValue, kebab)

    await addPathMatcher(
      config.app.projectId,
      config.app.name,
      config.app.loadBalancerDomain,
      [kebab],
      false,
    )

    return { status: 'success' }
  } catch (error) {
    throw new Error(`addBackendSetup: ${error}`)
  }
}
