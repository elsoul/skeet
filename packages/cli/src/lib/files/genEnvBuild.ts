import { FILE_NAME } from '@/config/path'
import { writeFile } from 'fs/promises'
import { Logger } from '@/lib/logger'

export const genEnvBuild = async (
  instanceName: string,
  generateDir: string,
  databaseIp: string,
  encodedPassword: string,
): Promise<{ key: string; value: string }> => {
  const secretKeyName =
    'DATABASE_BUILD_URL_' + instanceName.toUpperCase().replaceAll('-', '_')
  const filePath = generateDir + '/' + FILE_NAME.ENV_BUILD
  const databaseUrlValue = `postgresql://postgres:${encodedPassword}@${databaseIp}:5432/${instanceName}?schema=public\n`
  const databaseUrl = `DATABASE_URL=${databaseUrlValue}\n`
  const envFile = databaseUrl
  await writeFile(filePath, envFile, { flag: 'w' })
  Logger.success(`successfully exported! - ${filePath}`)
  const dbKeyValue = {
    key: secretKeyName,
    value: databaseUrlValue,
  }
  return dbKeyValue
}
