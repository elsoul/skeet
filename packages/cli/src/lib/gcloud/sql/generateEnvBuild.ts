import { FILE_NAME, PATH } from '@/config/path'
import { importConfig } from '@/lib/files/importConfig'
import { Logger } from '@/lib/logger'
import { writeFile } from 'fs/promises'

export const generateEnvBuild = async (
  appName: string,
  databaseIp: string,
  encodedPassword: string,
) => {
  const skeetConfig = await importConfig()
  const filePath = skeetConfig.app.template.includes('GraphQL')
    ? PATH.GRAPHQL + '/' + FILE_NAME.ENV_BUILD
    : PATH.SQL + '/' + FILE_NAME.ENV_BUILD
  const databaseUrl = `DATABASE_URL=postgresql://postgres:${encodedPassword}@${databaseIp}:5432/skeet-${appName}-production?schema=public\n`
  const nodeSetting = 'NO_PEER_DEPENDENCY_CHECK=1\nSKEET_ENV=production'
  const envFile = databaseUrl + nodeSetting
  await writeFile(filePath, envFile, { flag: 'w' })
  Logger.success(`successfully exported! - ${filePath}`)
}
