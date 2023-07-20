import { importConfig, runVpcNat, setGcloudProject } from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'

export const setupNetwork = async () => {
  const config: SkeetCloudConfig = await importConfig()
  await setGcloudProject(config.app.projectId)
  await runVpcNat(config.app.projectId, config.app.name, config.app.region)
}
