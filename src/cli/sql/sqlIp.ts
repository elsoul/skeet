import { SkeetCloudConfig } from '@/types/skeetTypes'
import { importConfig, patchSQL, getNetworkConfig } from '@/lib'

export const sqlIp = async () => {
  const skeetCloudConfig: SkeetCloudConfig = importConfig()
  const { networkName, instanceName } = getNetworkConfig(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
  )
  await patchSQL(
    skeetCloudConfig.app.projectId,
    instanceName,
    '',
    skeetCloudConfig.db.whiteList,
    networkName,
  )
}
