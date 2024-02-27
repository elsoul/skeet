import { importConfig } from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import chalk from 'chalk'
import * as Table from 'cli-table3'
import inquirer from 'inquirer'
import { cloneSQL } from './cloneSQL'
import { writeFileSync } from 'node:fs'
import { SKEET_CONFIG_PATH } from '@/index'
import { deployCloudSQL } from './deployCloudSQL'

type AnswerResponse = {
  instanceName: string
  databaseVersion: string
  storageSize: string
  cpu: string
  memory: string
}

export const addCloudSQL = async (config: SkeetCloudConfig) => {
  const answer = await inquirer.prompt<AnswerResponse>([
    {
      type: 'input',
      name: 'instanceName',
      message: 'Cloud SQL Instance Name:',
      default: `${config.app.name}`,
    },
    {
      type: 'list',
      name: 'databaseVersion',
      message: 'Database Version:',
      choices: ['POSTGRES_15', 'MYSQL_8_0'],
      default: config.db.databaseVersion,
    },
    {
      type: 'input',
      name: 'storageSize',
      message: 'Storage Size(GB):',
      default: config.db.storageSize,
    },
    {
      type: 'input',
      name: 'cpu',
      message: 'CPU:',
      default: config.db.cpu,
    },
    {
      type: 'input',
      name: 'memory',
      message: 'Memory:',
      default: config.db.memory,
    },
  ])
  const sqlName = answer.instanceName + '-db'

  const table = new Table.default({
    style: {
      head: ['blue'],
      border: [],
    },
  })
  const instanceName = `sql-${sqlName}`
  const tableBody = [
    ['Instance Name', chalk.green(instanceName)],
    ['Database Version', chalk.green(answer.databaseVersion)],
    ['Storage Size', chalk.green(answer.storageSize)],
    ['CPU', chalk.green(answer.cpu)],
    ['Memory', chalk.green(answer.memory)],
  ]
  tableBody.forEach((row) => {
    table.push(row)
  })
  console.log(chalk.white(table.toString()))
  const confirm = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to create Cloud SQL instance now?',
      default: false,
    },
  ])
  await cloneSQL(sqlName)
  if (!confirm.confirm) {
    const announce = `💡 You can create the Cloud SQL instance later by running the command:

${chalk.green('$ skeet deploy --sql')}
    `
    console.log(chalk.yellow(announce))
    return
  } else {
    await deployCloudSQL(
      instanceName,
      config,
      answer.databaseVersion,
      answer.cpu,
      answer.memory,
    )
  }
}

export const updateSkeetConfigDb = (instanceName: string) => {
  const config = importConfig()
  const sqls = config.SQLs

  sqls.forEach((sql) => {
    if (sql.instanceName === instanceName) {
      sql.isCreated = true
    }
  })
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(config, null, 2))
}
