import { importConfig, addPathMatcher } from '@/lib'

export const addRounting = async (methodName: string, paths: string[]) => {
  const config = importConfig()
  await addPathMatcher(
    config.app.projectId,
    config.app.name,
    config.app.lbDomain,
    paths,
  )
}
