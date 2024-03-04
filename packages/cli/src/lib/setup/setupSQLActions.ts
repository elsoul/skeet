import { importConfig } from '@/lib'
import { Logger } from '@/lib/logger'
import { writeFile } from 'fs/promises'
import { sqlYml } from '@/templates/init/sql.yml'

export const setupSQLActions = async (
  instanceName: string,
  memory: string,
  cpu: string,
  maxConcurrency: string,
  maxInstances: string,
  minInstances: string,
) => {
  try {
    const config = await importConfig()
    const region = config.app.region
    const splitInstanceName = instanceName.split('-')
    const dbName = splitInstanceName[1].toUpperCase()
    const databaseUrl = `DATABASE_URL=\${{ secrets.DATABASE_URL_${dbName} }}`
    const envString = databaseUrl
    const result = await sqlYml(
      instanceName,
      memory,
      cpu,
      maxConcurrency,
      maxInstances,
      minInstances,
      envString,
      region,
    )
    await writeFile(result.filePath, result.body, { flag: 'w' })
    Logger.success(`Successfully updated ${result.filePath}!`)

    return true
  } catch (error) {
    console.log(`setupSQLActions: ${error}`)
    throw new Error(`error:${error}`)
  }
}
