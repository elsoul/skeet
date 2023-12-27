import { importConfig, addPathMatcher } from '@/lib'

export const addRounting = (methodName: string, paths: string[]) => {
  const config = importConfig()
  addPathMatcher(
    config.app.projectId,
    config.app.name,
    config.app.lbDomain,
    paths,
  )
}
