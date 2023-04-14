import { addBackend, createBackend, createNeg, updateBackend } from '@/cli'
import { addPathMatcher } from '@/cli/gcloud/lb/addPathMatcher'
import { importConfig } from '@/index'

export const addRounting = async (
  projectId: string,
  functionName: string,
  region: string,
  domain: string
) => {
  const config = await importConfig()
  await createNeg(projectId, functionName, region)
  await createBackend(projectId, functionName)
  await addBackend(projectId, functionName, region)
  await addPathMatcher(projectId, config.app.name, functionName, domain)
  await updateBackend(config.app.projectId, config.app.name, functionName)
}
