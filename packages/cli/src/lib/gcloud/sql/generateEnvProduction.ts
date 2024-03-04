import { FILE_NAME, PATH } from '@/config/path'
import {
  getContainerRegion,
  regionToTimezone,
} from '@/lib/files/getSkeetConfig'
import { importConfig } from '@/lib/files/importConfig'
import { Logger } from '@/lib/logger'
import { writeFile } from 'fs/promises'

export const generateEnvProduction = async (
  projectId: string,
  appName: string,
  region: string,
  databaseIp: string,
  encodedPassword: string,
) => {
  const skeetConfig = await importConfig()
  const filePath = skeetConfig.app.template.includes('GraphQL')
    ? PATH.GRAPHQL + '/' + FILE_NAME.ENV_PRODUCTION
    : PATH.SQL + '/' + FILE_NAME.ENV_PRODUCTION
  const cRegion = getContainerRegion(region)
  const timeZone = regionToTimezone(region)
  const envProduction = [
    `SKEET_APP_NAME=${appName}\n`,
    `SKEET_GCP_PROJECT_ID=${projectId}\n`,
    `GOOGLE_CLOUD_PROJECT=${projectId}\n`,
    `SKEET_GCP_REGION=${region}\n`,
    `SKEET_GCP_TASK_REGION=${region}\n`,
    `SKEET_GCP_DB_PASSWORD=${encodedPassword}\n`,
    `SKEET_CONTAINER_REGION=${cRegion}\n`,
    `SKEET_GCP_DB_PRIVATE_IP=${databaseIp}\n`,
    `TZ=${timeZone}`,
  ]
  envProduction.forEach(async (keyValue) => {
    await writeFile(filePath, keyValue, { flag: 'a' })
  })
  Logger.success(`successfully exported! - ${filePath}`)
}
