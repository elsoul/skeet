import { askForSqlPassword } from '@/cli/init'
import {
  addEnvSync,
  createSQL,
  createSqlUser,
  getDatabaseIp,
  getNetworkConfig,
  patchSQL,
} from '@/lib'
import { genEnvBuild } from '@/lib/files/genEnvBuild'
import { genEnvProduction } from '@/lib/files/genEnvProduction'
import { setupSQLActions } from '@/lib/setup/setupSQLActions'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import percentEncode from '@stdlib/string-percent-encode'
import { updateSkeetConfigDb } from './addCloudSQL'

export const deployCloudSQL = async (
  instanceName: string,
  config: SkeetCloudConfig,
  databaseVersion: string,
  cpu: string,
  memory: string,
) => {
  const password = await askForSqlPassword()
  const encodedPassword = percentEncode(password)
  const sqlName = instanceName.replace('sql-', '')
  await createSQL(
    config.app.projectId,
    instanceName,
    config.app.region,
    encodedPassword,
    databaseVersion,
    cpu,
    memory,
  )
  const databaseIp = await getDatabaseIp(config.app.projectId, instanceName)

  const genDir = `./sql/${sqlName}`
  genEnvBuild(instanceName, genDir, databaseIp, encodedPassword)
  const { networkName } = getNetworkConfig(
    config.app.projectId,
    config.app.name,
  )
  await patchSQL(config.app.projectId, instanceName, '', '', networkName)
  const databasePrivateIp = await getDatabaseIp(
    config.app.projectId,
    instanceName,
    true,
  )
  genEnvProduction(
    instanceName,
    genDir,
    config.app.region,
    databasePrivateIp,
    encodedPassword,
  )
  const envProductionPath = `${genDir}/.env.production`
  await addEnvSync(envProductionPath)
  const maxConcurrency = '80'
  const maxInstances = '100'
  const minInstances = '0'
  setupSQLActions(
    instanceName,
    memory,
    cpu,
    maxConcurrency,
    maxInstances,
    minInstances,
  )
  updateSkeetConfigDb(instanceName)
}
