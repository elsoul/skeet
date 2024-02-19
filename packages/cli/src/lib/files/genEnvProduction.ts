import { writeFileSync } from 'fs'
import { getContainerRegion, regionToTimezone } from './getSkeetConfig'
import { importConfig } from './importConfig'
import { Logger } from '../logger'

export const genEnvProduction = (
  instanceName: string,
  generateDir: string,
  region: string,
  databaseIp: string,
  encodedPassword: string,
) => {
  const { app } = importConfig()
  const cRegion = getContainerRegion(region)
  const timeZone = regionToTimezone(region)
  const upperCaseInstanceName = instanceName.toUpperCase().replaceAll('-', '_')
  const filePath = `${generateDir}/.env.production`
  const instanceNameSplit = instanceName.split('-')
  const dbName = instanceNameSplit[1].toUpperCase()
  const envProduction = [
    `SKEET_APP_NAME=${app.name}\n`,
    `SKEET_GCP_PROJECT_ID=${app.projectId}\n`,
    `SKEET_GCP_REGION=${region}\n`,
    `SKEET_CONTAINER_REGION=${cRegion}\n`,
    `${upperCaseInstanceName}_PRIVATE_IP=${databaseIp}\n`,
    `DATABASE_URL_${dbName}="postgresql://postgres:$${encodedPassword}@${databaseIp}:5432/${instanceName}?schema=public"\n`,
    `TZ=${timeZone}`,
  ]
  envProduction.forEach((keyValue) => {
    writeFileSync(filePath, keyValue, { flag: 'a' })
  })
  Logger.success(`successfully exported! - ${filePath}`)
}
