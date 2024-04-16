import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { patchSQL } from '@/lib/gcloud/sql/patchSQL'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { findSQLConfigByName } from '@/lib/files/findSQLConfigByName'

export const sqlIp = async (instanceName: string) => {
  const instanceConfig = await findSQLConfigByName(instanceName)
  const skeetCloudConfig = await readOrCreateConfig()
  const { networkName } = getNetworkConfig(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
  )
  await patchSQL(
    skeetCloudConfig.app.projectId,
    instanceConfig.instanceName,
    '',
    instanceConfig.whiteList,
    networkName,
  )
}
