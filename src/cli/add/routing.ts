import { addPathMatcher } from '@/cli/gcloud/lb/addPathMatcher'
import { importConfig } from '@/index'
import { convertToKebabCase } from '@/utils/string'

export const addRounting = async (functionName: string, paths: string[]) => {
  const config = await importConfig()
  const kebab = convertToKebabCase(functionName)
  await addPathMatcher(
    config.app.projectId,
    config.app.name,
    kebab,
    config.app.functionsDomain,
    paths
  )
}
