import { SkeetCloudConfig } from '@/types/skeetTypes'
import { createVpcNetwork } from '../gcloud'
import { initSql } from '@/cli/init/initSql'
import { sqlIp } from '@/cli'
import { addIp } from '@/cli/sub/add/addIp'
import { dbDeploy } from '@/cli/sub/db/dbDeploy'
import { addEnvSync } from '../git'
import { FILE_NAME, PATH } from '@/config/path'

export const setupSQL = async (
  skeetConfig: SkeetCloudConfig,
  sqlPassword: string,
  needVpc = true,
) => {
  try {
    if (needVpc) {
      await createVpcNetwork(
        skeetConfig.app.projectId,
        skeetConfig.app.name,
        skeetConfig.app.region,
      )
    }

    await initSql(skeetConfig, sqlPassword)
    await addIp()
    await sqlIp()
    await dbDeploy(true)
    const envProductionPath = skeetConfig.app.template.includes('GraphQL')
      ? PATH.GRAPHQL + '/' + FILE_NAME.ENV_PRODUCTION
      : PATH.SQL + '/' + FILE_NAME.ENV_PRODUCTION
    await addEnvSync(envProductionPath)
    return true
  } catch (error) {
    throw new Error(`setupSQL error: ${error}`)
  }
}
