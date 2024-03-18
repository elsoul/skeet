import { askForSqlPassword } from '@/cli/init'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { addEnvSync } from '@/lib/git/addEnvSync'
import { createSQL } from '@/lib/gcloud/sql/createSQL'
import { patchSQL } from '@/lib/gcloud/sql/patchSQL'
import { getDatabaseIp } from '@/lib/gcloud/sql/getDatabaseIp'
import { genEnvBuild } from '@/lib/files/genEnvBuild'
import { genEnvProduction } from '@/lib/files/genEnvProduction'
import { setupSQLActions } from '@/lib/setup/setupSQLActions'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import percentEncode from '@stdlib/string-percent-encode'
import { updateSkeetConfigDb } from './addCloudSQL'
import { firebaseAddSecret } from '@/lib/firebase/firebaseAddSecret'

export const deployCloudSQL = async (
  instanceName: string,
  config: SkeetCloudConfig,
  databaseVersion: string,
  cpu: string,
  memory: string,
) => {
  const password = await askForSqlPassword()
  const encodedPassword = percentEncode(password)
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

  const genDir = `./sql/${instanceName}`
  const { key, value } = await genEnvBuild(
    instanceName,
    genDir,
    databaseIp,
    encodedPassword,
  )
  await firebaseAddSecret(key, value)
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
  await genEnvProduction(
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
  await setupSQLActions(
    instanceName,
    memory,
    cpu,
    maxConcurrency,
    maxInstances,
    minInstances,
  )
  await updateSkeetConfigDb(instanceName)
}
