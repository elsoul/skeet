import { SkeetCloudConfig } from '@/types/skeetTypes'
import { importConfig } from '../files'
import { createVpcNetwork } from '../gcloud'
import { initSql } from '@/cli/init/initSql'
import { askForGithubRepo, askForSqlPassword, sqlIp } from '@/cli'
import { addIp } from '@/cli/sub/add/addIp'
import { dbDeploy } from '@/cli/sub/db/dbDeploy'
import { addEnvSync } from '../git'
import { GRAPHQL_ENV_PRODUCTION_PATH } from '@/index'

export const setupSQL = async (
  skeetConfig: SkeetCloudConfig,
  sqlPassword: string
) => {
  try {
    await createVpcNetwork(
      skeetConfig.app.projectId,
      skeetConfig.app.name,
      skeetConfig.app.region
    )
    await initSql(skeetConfig, sqlPassword)
    await addIp()
    await sqlIp()
    await dbDeploy(true)
    await addEnvSync(GRAPHQL_ENV_PRODUCTION_PATH)
    return true
  } catch (error) {
    throw new Error(`setupSQL error: ${error}`)
  }
}
