import { addBackend, createBackend, createNeg, updateBackend } from '@/cli'
import { addPathMatcher } from '@/cli/gcloud/lb/addPathMatcher'
import { importConfig } from '@/index'
import { convertToKebabCase } from '@/utils/string'

export const addRounting = async (
  projectId: string,
  functionName: string,
  region: string,
  domain: string
) => {
  const config = await importConfig()
  await createNeg(projectId, functionName, region)
  const kebab = convertToKebabCase(functionName)
  await createBackend(projectId, kebab)
  await addBackend(projectId, config.app.name, kebab, region)
  await addPathMatcher(projectId, config.app.name, kebab, domain)
  await updateBackend(config.app.projectId, config.app.name, kebab)
}
