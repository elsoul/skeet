import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { addPathMatcher } from '@/lib'

export const addRouting = async (paths: string[]) => {
  const config = await readOrCreateConfig()
  await addPathMatcher(
    config.app.projectId,
    config.app.name,
    config.app.loadBalancerDomain,
    paths,
  )
}
