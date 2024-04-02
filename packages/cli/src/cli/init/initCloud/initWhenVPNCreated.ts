import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { updateSkeetCloudConfigCloudStatus } from '../updateSkeetCloudConfigCloudStatus'
import { getSQLs } from '@/lib/files/getSQLs'
import chalk from 'chalk'

export const initWhenVPNCreated = async () => {
  const config = await readOrCreateConfig()
  const sqlDirs = await getSQLs()
  if (sqlDirs.length > 0) {
    const sqls = config.SQL.filter((sql) => sql.status === 'NOT_CREATED')
    if (sqls.length > 0) {
      console.log(chalk.white(`You have ${sqls.length} SQLs to create.`))
      console.log(
        chalk.white(
          'Please run this command to create Cloud SQL:\n\n$ skeet deploy --sql\n',
        ),
      )
    } else {
      await updateSkeetCloudConfigCloudStatus('SQL_CREATED')
    }
    return
  } else {
    console.log(chalk.white('No SQL API found.'))
    console.log(
      chalk.white(
        'Please run this command to create SQL API:\n\n$ skeet add sql\n',
      ),
    )
    return
  }
}
