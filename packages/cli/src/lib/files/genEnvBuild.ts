import { FILE_NAME } from '@/config/path'
import { writeFile } from 'fs/promises'
import { Logger } from '@/lib/logger'

export const genEnvBuild = async (
  instanceName: string,
  generateDir: string,
  databaseIp: string,
  encodedPassword: string,
): Promise<{ key: string; value: string }> => {
  const capitalDbName = instanceName.toUpperCase().replace('_DB', '')
  const filePath = generateDir + '/' + FILE_NAME.ENV_BUILD
  const databaseUrlValue = `postgresql://postgres:${encodedPassword}@${databaseIp}:5432/${instanceName}?schema=public\n`
  const databaseUrl = `DATABASE_URL=${databaseUrlValue}\n`
  const nodeSetting = 'NO_PEER_DEPENDENCY_CHECK=1\nSKEET_ENV=production'
  const envFile = databaseUrl + nodeSetting
  await writeFile(filePath, envFile, { flag: 'w' })
  Logger.success(`successfully exported! - ${filePath}`)
  const dbKeyValue = {
    key: capitalDbName,
    value: databaseUrlValue,
  }
  return dbKeyValue
}
