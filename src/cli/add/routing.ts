import { addBackend, createBackend, createNeg, updateBackend } from '@/cli'
import { addPathMatcher } from '@/cli/gcloud/lb/addPathMatcher'
import { importConfig } from '@/index'
import { getFunctionInfo, isNegExists } from '@/lib/getSkeetConfig'
import { convertToKebabCase } from '@/utils/string'

export const addRounting = async (
  projectId: string,
  functionName: string,
  region: string,
  domain: string
) => {
  const config = await importConfig()
  const kebab = convertToKebabCase(functionName)
  const functionInfo = await getFunctionInfo(kebab)
  const isNeg = await isNegExists(functionInfo.neg, region, projectId)
  if (isNeg) {
    return
  }
  await createNeg(projectId, functionName, region)
  await createBackend(projectId, kebab)
  await addBackend(projectId, config.app.name, kebab, region)
  await addPathMatcher(projectId, config.app.name, kebab, domain)
  await updateBackend(config.app.projectId, config.app.name, kebab)
}
