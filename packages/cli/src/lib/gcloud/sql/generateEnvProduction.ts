import { Logger } from '@/lib/logger'
import { writeFile } from 'fs/promises'

export const generateEnvProduction = async (
  appName: string,
  databaseUser: string,
  databaseIp: string,
  encodedPassword: string,
) => {
  const filePath = `sql/${appName}/.env.production`
  const secretKeyName =
    'DATABASE_PRODUCTION_URL_' + appName.toUpperCase().replaceAll('-', '_')

  const value = `postgresql://${databaseUser}:${encodedPassword}@${databaseIp}:5432/skeet-${appName}-production?schema=public\n`
  const envFile = `${secretKeyName}=${value}\n`
  await writeFile(filePath, envFile, { flag: 'w' })
  Logger.success(`successfully exported! - ${filePath}`)
  return {
    key: secretKeyName,
    value,
  }
}
