import {
  addBackend,
  createBackend,
  createNeg,
  updateBackend,
  importConfig,
  isNegExists,
} from '@/lib'
import { convertToKebabCase } from '@/utils/string'

export const addBackendSetup = async (methodName: string) => {
  try {
    const config = importConfig()
    const kebab = convertToKebabCase(methodName)
    const isNeg = await isNegExists(
      config.app.projectId,
      config.app.region,
      kebab
    )
    if (isNeg) return { status: 'skip' }

    await createNeg(config.app.projectId, methodName, config.app.region)
    await createBackend(config.app.projectId, kebab)
    await addBackend(
      config.app.projectId,
      config.app.name,
      kebab,
      config.app.region
    )
    await updateBackend(config.app.projectId, config.app.name, kebab)
    return { status: 'success' }
  } catch (error) {
    throw new Error(`addBackendSetup: ${error}`)
  }
}
