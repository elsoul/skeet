import chalk from 'chalk'
import * as Table from 'cli-table3'
import inquirer from 'inquirer'
import { cloneSQL } from '@/cli/sub/add/cloneSQL'
import { readFile, writeFile } from 'fs/promises'
import { SKEET_CONFIG_PATH } from '@/index'
import { deployCloudSQL } from '@/cli/sub/add/deployCloudSQL'
import {
  CloudRunConfig,
  DatabaseVersion,
  SkeetCloudConfig,
} from '@/config/skeetCloud'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { getSQLs } from '@/lib/files/getSQLs'

type AnswerResponse = {
  instanceName: string
  databaseVersion: string
  storageSize: string
  cpu: string
  memory: string
}

export const addCloudSQL = async (config: SkeetCloudConfig) => {
  const dbVersions = Object.values(DatabaseVersion)
  const answer = await inquirer.prompt<AnswerResponse>([
    {
      type: 'input',
      name: 'instanceName',
      message: 'Cloud SQL Instance Name:',
      default: `user-db`,
    },
    {
      type: 'list',
      name: 'databaseVersion',
      message: 'Database Version:',
      choices: dbVersions,
      default: 'POSTGRES_15',
    },
    {
      type: 'input',
      name: 'storageSize',
      message: 'Storage Size(GB):',
      default: '10',
    },
    {
      type: 'input',
      name: 'cpu',
      message: 'CPU:',
      default: '1',
    },
    {
      type: 'input',
      name: 'memory',
      message: 'Memory:',
      default: '4GiB',
    },
  ])
  let sqlName = answer.instanceName

  // Add -db suffix if not exists
  if (!sqlName.endsWith('-db')) {
    sqlName = `${sqlName}-db`
  }

  const table = new Table.default({
    style: {
      head: ['blue'],
      border: [],
    },
  })
  const instanceName = sqlName
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
  await updatePackageJsonPort(sqlName)
  await updateSkeetConfigDb(sqlName)
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
      String(answer.cpu),
      answer.memory,
    )
  }
}

export const updateSkeetConfigDb = async (
  instanceName: string,
  isDeployed = false,
  username = 'edgar',
) => {
  const config = await readOrCreateConfig()
  const sqls = config.SQL
  if (isDeployed) {
    sqls.forEach((sql) => {
      if (sql.instanceName === instanceName) {
        sql.username = username
        sql.status = 'RUNNING'
      }
    })
    if (config.app.cloudStatus === 'VPN_CREATED') {
      config.app.cloudStatus = 'SQL_CREATED'
    }
    await writeFile(SKEET_CONFIG_PATH, JSON.stringify(config, null, 2))
    return
  }
  const cloudRunName = instanceName.replace('-', '')
  const sqlDirs = await getSQLs()
  const localPort = 3000 + sqlDirs.length - 1
  const cloudRun: CloudRunConfig = {
    name: cloudRunName,
    url: '',
    localPort,
    cpu: 1,
    memory: '4GiB',
    maxConcurrency: 80,
    maxInstances: 100,
    minInstances: 0,
  }
  config.cloudRun.push(cloudRun)
  await writeFile(SKEET_CONFIG_PATH, JSON.stringify(config, null, 2))
}

const updatePackageJsonPort = async (instanceName: string) => {
  const sqlDirs = await getSQLs()
  if (sqlDirs.length === 1) {
    // No need to update the port
    return
  }
  const packageJsonPath = `./sql/${instanceName}/package.json`
  const packageJsonFile = await readFile(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonFile) as {
    port: number
    container: string
  }
  packageJson.port = packageJson.port + sqlDirs.length - 1
  packageJson.container = instanceName
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
}
