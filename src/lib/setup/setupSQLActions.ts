import { importConfig, getActionsEnvString } from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { GRAPHQL_ENV_PRODUCTION_PATH } from '@/index'
import { Logger } from '@/lib/logger'
import { writeFileSync } from 'fs'
import { graphqlYml } from '@/templates/init'
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
    const upperCaseInstanceName = instanceName
      .toUpperCase()
      .replaceAll('-', '_')
    const databaseUrl = `DATABASE_URL=postgresql://postgres\${{ secrets.${upperCaseInstanceName}_PASSWORD }}@\${{ secrets.${upperCaseInstanceName}_PRIVATE_IP }}:5432/${instanceName}?schema=public`
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
