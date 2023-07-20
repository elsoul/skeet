import {
  createSQL,
  generateEnvBuild,
  generateEnvProduction,
  getDatabaseIp,
  getNetworkConfig,
  patchSQL,
} from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import percentEncode from '@stdlib/string-percent-encode'

export const initSql = async (
  skeetCloudConfig: SkeetCloudConfig,
  password: string
) => {
  const { networkName } = await getNetworkConfig(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name
  )
  await createSQL(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    skeetCloudConfig.app.region,
    password,
    skeetCloudConfig.db.databaseVersion,
    String(skeetCloudConfig.db.cpu),
    skeetCloudConfig.db.memory
  )
  const encodedPassword = percentEncode(password)
  const databaseIp = await getDatabaseIp(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name
  )
  await generateEnvBuild(skeetCloudConfig.app.name, databaseIp, encodedPassword)

  await patchSQL(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    '',
    '',
    networkName
  )
  const databasePrivateIp = await getDatabaseIp(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    true
  )
  await generateEnvProduction(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    skeetCloudConfig.app.region,
    databasePrivateIp,
    encodedPassword
  )
}
