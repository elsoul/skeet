import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { createVpcNetwork, setGcloudProject } from '@/lib'

export const setupNetwork = async () => {
  const config = await readOrCreateConfig()
  await setGcloudProject(config.app.projectId)
  await createVpcNetwork(
    config.app.projectId,
    config.app.name,
    config.app.region,
  )
}
