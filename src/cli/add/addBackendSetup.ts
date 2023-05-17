import { addBackend, createBackend, createNeg, updateBackend } from '@/cli'
import { importConfig } from '@/index'
import { getFunctionInfo, isNegExists } from '@/lib/getSkeetConfig'
import { convertToKebabCase } from '@/utils/string'

export const addBackendSetup = async (functionName: string) => {
  try {
    const config = await importConfig()
    const kebab = convertToKebabCase(functionName)
    const functionInfo = await getFunctionInfo(kebab)
    const isNeg = await isNegExists(
      functionInfo.neg,
      config.app.region,
      config.app.projectId
    )
    if (isNeg) throw new Error(`${functionName} is already exists`)

    await createNeg(config.app.projectId, functionName, config.app.region)
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
