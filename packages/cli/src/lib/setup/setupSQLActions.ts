import { importConfig } from '@/lib'
import { Logger } from '@/lib/logger'
import { writeFileSync } from 'fs'
import { sqlYml } from '@/templates/init/sql.yml'

export const setupSQLActions = (
  instanceName: string,
  memory: string,
  cpu: string,
  maxConcurrency: string,
  maxInstances: string,
  minInstances: string,
) => {
  try {
    const config = importConfig()
    const region = config.app.region
    const splitInstanceName = instanceName.split('-')
    const dbName = splitInstanceName[1].toUpperCase()
    const databaseUrl = `DATABASE_URL=\${{ secrets.DATABASE_URL_${dbName} }}`
    const envString = databaseUrl
    const result = sqlYml(
      instanceName,
      memory,
      cpu,
      maxConcurrency,
      maxInstances,
      minInstances,
      envString,
      region,
    )
    writeFileSync(result.filePath, result.body, { flag: 'w' })
    Logger.success(`Successfully updated ${result.filePath}!`)

    return true
  } catch (error) {
    console.log(`setupSQLActions: ${error}`)
    throw new Error(`error:${error}`)
  }
}
