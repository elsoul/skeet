import { addPathMatcher } from '@/cli/gcloud/lb/addPathMatcher'
import { importConfig } from '@/lib/importConfig'

export const addRounting = async (methodName: string, paths: string[]) => {
  const config = await importConfig()
  await addPathMatcher(
    config.app.projectId,
    config.app.name,
    config.app.functionsDomain,
    paths
  )
}
