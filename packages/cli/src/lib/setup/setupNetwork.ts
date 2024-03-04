import { importConfig, createVpcNetwork, setGcloudProject } from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'

export const setupNetwork = async () => {
  const config: SkeetCloudConfig = await importConfig()
  await setGcloudProject(config.app.projectId)
  await createVpcNetwork(
    config.app.projectId,
    config.app.name,
    config.app.region,
  )
}
