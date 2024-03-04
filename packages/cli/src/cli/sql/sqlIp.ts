import { SkeetCloudConfig } from '@/types/skeetTypes'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { importConfig } from '@/lib/files/importConfig'
import { patchSQL } from '@/lib/gcloud/sql/patchSQL'

export const sqlIp = async () => {
  const skeetCloudConfig: SkeetCloudConfig = await importConfig()
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
