import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SQLConfig } from '@/config/skeetCloud'
import chalk from 'chalk'

export const findSQLConfigByName = async (instanceName: string) => {
  const config = await readOrCreateConfig()
  const sql = config.SQL.find((sql) => sql.instanceName === instanceName)
  if (!sql) {
    console.log(chalk.yellow('⚠️ SQL not found'))
    process.exit(1)
  }
  return sql as SQLConfig
}
