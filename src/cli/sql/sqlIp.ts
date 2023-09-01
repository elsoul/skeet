import { SkeetCloudConfig } from '@/types/skeetTypes'
import { importConfig, patchSQL, getNetworkConfig } from '@/lib'

export const sqlIp = async () => {
  const skeetCloudConfig: SkeetCloudConfig = importConfig()
  const { networkName } = await getNetworkConfig(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name
  )
  await patchSQL(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    '',
    skeetCloudConfig.db.whiteList,
    networkName
  )
}
