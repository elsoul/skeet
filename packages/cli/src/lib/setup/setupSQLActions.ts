import { regionToTimezone } from '@/lib'
import { Logger } from '@/lib/logger'
import { writeFile } from 'fs/promises'
import { sqlYml } from '@/templates/init/sql.yml'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const setupSQLActions = async (
  instanceName: string,
  memory: string,
  cpu: string,
  maxConcurrency: string,
  maxInstances: string,
  minInstances: string,
) => {
  try {
    const config = await readOrCreateConfig()
    const region = config.app.region
    const timezone = regionToTimezone(region)
    const TZ = `TZ=${timezone}`
    const secretKeyName =
      'DATABASE_PRODUCTION_URL_' +
      instanceName.toUpperCase().replaceAll('-', '_')
    const databaseUrl = `DATABASE_URL=\${{ secrets.${secretKeyName} }}`
    const envString = databaseUrl + '\n' + TZ + '\n'
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
