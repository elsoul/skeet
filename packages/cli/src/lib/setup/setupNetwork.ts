import { importConfig, createVpcNetwork, setGcloudProject } from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'

export const setupNetwork = async () => {
  const config: SkeetCloudConfig = importConfig()
  setGcloudProject(config.app.projectId)
  await createVpcNetwork(
    config.app.projectId,
    config.app.name,
    config.app.region,
  )
}
