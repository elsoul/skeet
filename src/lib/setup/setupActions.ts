import { importConfig, getActionsEnvString } from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { GRAPHQL_ENV_PRODUCTION_PATH } from '@/index'
import { Logger } from '@/lib/logger'
import { writeFileSync } from 'fs'
import { graphqlYml } from '@/templates/init'

export const setupActions = async () => {
  try {
    const skeetConfig: SkeetCloudConfig = importConfig()
    const envString = await getActionsEnvString(GRAPHQL_ENV_PRODUCTION_PATH)
    const result = await graphqlYml(
      envString,
      skeetConfig.cloudRun.memory,
      String(skeetConfig.cloudRun.cpu),
      String(skeetConfig.cloudRun.maxConcurrency),
      String(skeetConfig.cloudRun.maxInstances),
      String(skeetConfig.cloudRun.minInstances),
      skeetConfig.app.hasLoadBalancer
    )
    writeFileSync(result.filePath, result.body, { flag: 'w' })
    Logger.success(`Successfully updated ${result.filePath}!`)

    return true
  } catch (error) {
    console.log(`setupActions: ${error}`)
    throw new Error(`error:${error}`)
  }
}
