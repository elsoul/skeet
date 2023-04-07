import { runVpcNat, setGcloudProject } from '@/cli'
import { importConfig, SkeetCloudConfig } from '@/index'

export const setupNetwork = async () => {
  const config: SkeetCloudConfig = await importConfig()
  await setGcloudProject(config.api.projectId)
  await runVpcNat(config.api.projectId, config.api.appName, config.api.region)
}
