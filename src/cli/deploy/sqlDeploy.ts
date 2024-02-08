import { importConfig } from '@/lib'
import inquirer from 'inquirer'
import { deployCloudSQL } from '../sub/add/deployCloudSQL'
import { updateSkeetConfigDb } from '../sub/add/addCloudSQL'

export const sqlDeploy = async () => {
  const config = importConfig()
  const sqls = config.SQLs.filter((sql) => !sql.isCreated)
  if (sqls.length === 0) {
    console.log('No SQL instance to deploy')
    return
  }
  const context = `You have ${sqls.length} SQL instances to deploy.`
  console.log(context)
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
    updateSkeetConfigDb(sql.instanceName)
  }
}
