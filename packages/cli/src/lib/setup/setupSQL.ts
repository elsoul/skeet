import { SkeetCloudConfig } from '@/types/skeetTypes'
import { createVpcNetwork } from '@/lib/gcloud/network/createVpcNetwork'
import { initSql } from '@/cli/init/initSql'
import { sqlIp } from '@/cli/sql/sqlIp'
import { addIp } from '@/cli/sub/add/addIp'
import { dbDeploy } from '@/cli/sub/db/dbDeploy'
import { addEnvSync } from '@/lib/git/addEnvSync'
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
    const envProductionPath = PATH.SQL + '/' + FILE_NAME.ENV_PRODUCTION
    await addEnvSync(envProductionPath)
    return true
  } catch (error) {
    throw new Error(`setupSQL error: ${error}`)
  }
}
