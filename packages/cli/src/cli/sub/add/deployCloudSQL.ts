import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { createSQL } from '@/lib/gcloud/sql/createSQL'
import { patchSQL } from '@/lib/gcloud/sql/patchSQL'
import { getDatabaseIp } from '@/lib/gcloud/sql/getDatabaseIp'
import { genEnvBuild } from '@/lib/files/genEnvBuild'
import { setupSQLActions } from '@/lib/setup/setupSQLActions'
import percentEncode from '@stdlib/string-percent-encode'
import { updateSkeetConfigDb } from './addCloudSQL'
import { firebaseAddSecret } from '@/lib/firebase/firebaseAddSecret'
import { addEnv, createSqlUser } from '@/lib'
import { SkeetCloudConfig } from '@/config/skeetCloud'
import chalk from 'chalk'
import { generateEnvProduction } from '@/lib/gcloud/sql/generateEnvProduction'
import { askForSqlPassword } from '@/cli/init/askQuestions'
import { Spinner } from 'cli-spinner'
import { addIp } from './addIp'
import { sqlIp } from '@/cli/sql'

export const deployCloudSQL = async (
  instanceName: string,
  config: SkeetCloudConfig,
  databaseVersion: string,
  cpu: string,
  memory: string,
) => {
  const { username, password } = await askForSqlPassword()
  const encodedPassword = percentEncode(password)
  const spinner = new Spinner('⏳ Waiting for SQL instance to be ready... %s')
  spinner.setSpinnerString(18)
  spinner.start()

  const { stderr, stdout } = await createSQL(
    config.app.projectId,
    instanceName,
    config.app.region,
    encodedPassword,
    databaseVersion,
    cpu,
    memory,
  )
  spinner.setSpinnerTitle(chalk.white('Created Cloud SQL instance!'))
  await createSqlUser(config.app.projectId, instanceName, username, password)

  spinner.setSpinnerTitle(chalk.white('Created SQL User!'))
  const databaseIp = await getDatabaseIp(config.app.projectId, instanceName)

  const genDir = `./sql/${instanceName}`
  const { key, value } = await genEnvBuild(
    instanceName,
    genDir,
    databaseIp,
    encodedPassword,
  )
  spinner.setSpinnerTitle(chalk.white('Generated .env.build file!'))

  await firebaseAddSecret(key, value)
  spinner.setSpinnerTitle(chalk.white('Added secret to Firebase!'))

  await addEnv(key, value)
  spinner.setSpinnerTitle(chalk.white('Added secret to GitHub Secrets!'))

  const { networkName } = getNetworkConfig(
    config.app.projectId,
    config.app.name,
  )

  spinner.setSpinnerTitle(chalk.white('Patching SQL instance...'))
  await patchSQL(config.app.projectId, instanceName, '', '', networkName)
  spinner.setSpinnerTitle(chalk.white('SQL instance patched successfully!'))

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
  spinner.setSpinnerTitle(
    chalk.white('Generated production .env.production file!'),
  )

  await firebaseAddSecret(productionEnv.key, productionEnv.value)
  spinner.setSpinnerTitle(chalk.white('Added production secret to Firebase!'))

  await addEnv(productionEnv.key, productionEnv.value)
  spinner.setSpinnerTitle(
    chalk.white('Added production secret to GitHub Secrets!'),
  )

  await addIp()
  await sqlIp(instanceName)

  const maxConcurrency = '80'
  const maxInstances = '5'
  const minInstances = '0'
  await setupSQLActions(
    instanceName,
    memory,
    cpu,
    maxConcurrency,
    maxInstances,
    minInstances,
  )
  spinner.setSpinnerTitle(chalk.white('Setup GitHub Actions!'))

  await updateSkeetConfigDb(instanceName, true, username)
  spinner.setSpinnerTitle(chalk.white('Updated Skeet Config!'))
  spinner.stop()
}
