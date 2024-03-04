import { createSQL } from '@/lib/gcloud/sql/createSQL'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import percentEncode from '@stdlib/string-percent-encode'
import { getDatabaseIp } from '@/lib/gcloud/sql/getDatabaseIp'
import { generateEnvBuild } from '@/lib/gcloud/sql/generateEnvBuild'
import { patchSQL } from '@/lib/gcloud/sql/patchSQL'
import { generateEnvProduction } from '@/lib/gcloud/sql/generateEnvProduction'

export const initSql = async (
  skeetCloudConfig: SkeetCloudConfig,
  password: string,
) => {
  const { networkName } = getNetworkConfig(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
  )
  const instanceName = getNetworkConfig(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
  ).instanceName
  await createSQL(
    skeetCloudConfig.app.projectId,
    instanceName,
    skeetCloudConfig.app.region,
    password,
    skeetCloudConfig.db.databaseVersion,
    String(skeetCloudConfig.db.cpu),
    skeetCloudConfig.db.memory,
  )
  const encodedPassword = percentEncode(password)
  const databaseIp = await getDatabaseIp(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
  )
  await generateEnvBuild(skeetCloudConfig.app.name, databaseIp, encodedPassword)

  await patchSQL(
    skeetCloudConfig.app.projectId,
    instanceName,
    '',
    '',
    networkName,
  )
  const databasePrivateIp = await getDatabaseIp(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    true,
  )
  await generateEnvProduction(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    skeetCloudConfig.app.region,
    databasePrivateIp,
    encodedPassword,
  )
}
