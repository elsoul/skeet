import { addPathMatcher } from '@/cli/gcloud/lb/addPathMatcher'
import { importConfig } from '@/index'
import { convertToKebabCase } from '@/utils/string'

export const addRounting = async (methodName: string, paths: string[]) => {
  const config = await importConfig()
  const kebab = convertToKebabCase(methodName)
  await addPathMatcher(
    config.app.projectId,
    config.app.name,
    kebab,
    config.app.functionsDomain,
    paths
  )
}
