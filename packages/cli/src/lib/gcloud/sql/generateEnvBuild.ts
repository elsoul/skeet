import { Logger } from '@/lib/logger'
import { writeFile } from 'fs/promises'

export const generateEnvBuild = async (
  appName: string,
  databaseUser: string,
  databaseIp: string,
  encodedPassword: string,
) => {
  const filePath = `sql/${appName}/.env.build`
  const envFile = `DATABASE_URL=postgresql://${databaseUser}:${encodedPassword}@${databaseIp}:5432/skeet-${appName}-production?schema=public\n`
  await writeFile(filePath, envFile, { flag: 'w' })
  Logger.success(`successfully exported! - ${filePath}`)
}
