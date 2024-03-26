import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'

export const firebaseGetSecret = async (secretKey: string) => {
  const config = await readOrCreateConfig()
  if (!/^[A-Z_]+$/.test(secretKey)) {
    console.log(chalk.yellow('⚠️ secretKey must be uppercase letters only.'))
    return null
  }
  const cmd = `firebase functions:secrets:access ${secretKey} --project ${config.app.fbProjectId}`
  const result = await execAsync(cmd)
  if (result.stdout == null || result.stdout.trim() === '') {
    console.log(chalk.yellow('⚠️ secretKey not found.'))
    return null
  }
  return result.stdout.trim()
}
