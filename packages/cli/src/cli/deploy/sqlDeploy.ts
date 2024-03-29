import inquirer from 'inquirer'
import { deployCloudSQL } from '@/cli/sub/add/deployCloudSQL'
import { updateSkeetConfigDb } from '@/cli/sub/add/addCloudSQL'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import chalk from 'chalk'

export const sqlDeploy = async () => {
  const config = await readOrCreateConfig()
  const sqls = config.SQL.filter((sql) => sql.status === 'NOT_CREATED')
  if (sqls.length === 0) {
    console.log('No SQL instance to deploy')
    return
  }
  const context = `You have ${sqls.length} SQL instances to deploy.`
  console.log(chalk.white(context))
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to deploy now?',
      default: false,
    },
  ])
  if (!answer.confirm) {
    return
  }
  for (const sql of sqls) {
    console.log(`🚀 Deploying ${sql.instanceName}`)
    await deployCloudSQL(
      sql.instanceName,
      config,
      sql.databaseVersion,
      String(sql.cpu),
      sql.memory,
    )
    await updateSkeetConfigDb(sql.instanceName, true)
  }
}
