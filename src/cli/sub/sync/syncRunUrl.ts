import { getRunUrl, importConfig, Logger } from '@/lib'
import { GRAPHQL_ENV_PRODUCTION_PATH, SKEET_CONFIG_PATH } from '@/index'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { writeFileSync } from 'fs'

export const syncRunUrl = async () => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  if (!skeetConfig.app.hasLoadBalancer) await syncGraphqlUrl(skeetConfig)
  Logger.successCheck(`successfully updated cloud run urls`)
}

export const syncGraphqlUrl = async (
  skeetConfig: SkeetCloudConfig,
  domain: string = ''
) => {
  skeetConfig.cloudRun.url =
    domain !== ''
      ? `https://${domain}`
      : await getRunUrl(skeetConfig.app.projectId, skeetConfig.app.name)
  if (domain) {
    skeetConfig.cloudRun.url = `https://${domain}`
  } else {
    skeetConfig.cloudRun.url = await getRunUrl(
      skeetConfig.app.projectId,
      skeetConfig.app.name
    )
    const addEnvString = `\nSKEET_GRAPHQL_ENDPOINT_URL=${skeetConfig.cloudRun.url}`
    writeFileSync(GRAPHQL_ENV_PRODUCTION_PATH, addEnvString, { flag: 'a' })
  }
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
}
