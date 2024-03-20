import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'

export const firebaseGetSecret = async (secretKey: string) => {
  if (!/^[A-Z_]+$/.test(secretKey)) {
    console.log(chalk.yellow('⚠️ secretKey must be uppercase letters only.'))
    return null
  }
  const cmd = `firebase functions:secrets:access ${secretKey}`
  const result = await execAsync(cmd)
  if (result.stdout == null) {
    console.log(chalk.yellow('⚠️ secretKey not found.'))
    return null
  }
  return result.stdout.trim()
}