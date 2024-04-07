import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { createSQL } from '@/lib/gcloud/sql/createSQL'
import { patchSQL } from '@/lib/gcloud/sql/patchSQL'
import { getDatabaseIp } from '@/lib/gcloud/sql/getDatabaseIp'
import { genEnvBuild } from '@/lib/files/genEnvBuild'
import { genEnvProduction } from '@/lib/files/genEnvProduction'
import { setupSQLActions } from '@/lib/setup/setupSQLActions'
import percentEncode from '@stdlib/string-percent-encode'
import { updateSkeetConfigDb } from './addCloudSQL'
import { firebaseAddSecret } from '@/lib/firebase/firebaseAddSecret'
import { addEnv } from '@/lib'
import { SkeetCloudConfig } from '@/config/skeetCloud'
import chalk from 'chalk'
import { generateEnvProduction } from '@/lib/gcloud/sql/generateEnvProduction'
import { askForSqlPassword } from '@/cli/init/askQuestions'

export const deployCloudSQL = async (
  instanceName: string,
  config: SkeetCloudConfig,
  databaseVersion: string,
  cpu: string,
  memory: string,
) => {
  const { username, password } = await askForSqlPassword()
  const encodedPassword = percentEncode(password)
  console.log(
    chalk.white(
      `⏳ Waiting for SQL instance to be ready...\nThis may take a few minutes.`,
    ),
  )

  const { stderr, stdout } = await createSQL(
    config.app.projectId,
    instanceName,
    config.app.region,
    encodedPassword,
    databaseVersion,
    cpu,
    memory,
  )
  if (stderr) {
    console.log(stderr)
    return
  }

  const databaseIp = await getDatabaseIp(config.app.projectId, instanceName)
  console.log(stdout)

  const genDir = `./sql/${instanceName}`
  const { key, value } = await genEnvBuild(
    instanceName,
    genDir,
    databaseIp,
    encodedPassword,
  )
  await firebaseAddSecret(key, value)
  await addEnv(key, value)
  const { networkName } = getNetworkConfig(
    config.app.projectId,
    config.app.name,
  )

  console.log(
    chalk.white(
      `⏳ Waiting for SQL instance to be patched...\nThis may take a few minutes.`,
    ),
  )
  await patchSQL(config.app.projectId, instanceName, '', '', networkName)
  const databasePrivateIp = await getDatabaseIp(
    config.app.projectId,
    instanceName,
    true,
  )
  const productionEnv = await generateEnvProduction(
    instanceName,
    username,
    databasePrivateIp,
    encodedPassword,
  )
  await firebaseAddSecret(productionEnv.key, productionEnv.value)
  await addEnv(productionEnv.key, productionEnv.value)
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
  await updateSkeetConfigDb(instanceName, true, username)
}
