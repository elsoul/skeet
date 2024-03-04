import { FILE_NAME } from '@/config/path'
import { writeFile } from 'fs/promises'
import { Logger } from '@/lib/logger'

export const genEnvBuild = async (
  instanceName: string,
  generateDir: string,
  databaseIp: string,
  encodedPassword: string,
) => {
  const filePath = generateDir + '/' + FILE_NAME.ENV_BUILD
  const databaseUrl = `DATABASE_URL=postgresql://postgres:${encodedPassword}@${databaseIp}:5432/${instanceName}?schema=public\n`
  const nodeSetting = 'NO_PEER_DEPENDENCY_CHECK=1\nSKEET_ENV=production'
  const envFile = databaseUrl + nodeSetting
  await writeFile(filePath, envFile, { flag: 'w' })
  Logger.success(`successfully exported! - ${filePath}`)
}
