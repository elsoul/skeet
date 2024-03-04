import { importConfig } from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'

export const setupActions = async () => {
  try {
    const skeetConfig: SkeetCloudConfig = await importConfig()
    //const envString = await getActionsEnvString(GRAPHQL_ENV_PRODUCTION_PATH)
    return true
  } catch (error) {
    console.log(`setupActions: ${error}`)
    throw new Error(`error:${error}`)
  }
}
