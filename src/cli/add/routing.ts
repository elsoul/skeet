import { addBackend, createBackend, createNeg } from '@/cli'
import { addPathMatcher } from '@/cli/gcloud/lb/addPathMatcher'

export const addRounting = async (
  projectId: string,
  functionName: string,
  region: string,
  domain: string
) => {
  await createNeg(projectId, functionName, region)
  await createBackend(projectId, functionName)
  await addBackend(projectId, functionName, region)
  await addPathMatcher(projectId, functionName, domain)
}
