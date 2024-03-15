import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'

export const firebaseAddSecret = async (
  secretKey: string,
  secretValue: string,
) => {
  if (!/^[A-Z_]+$/.test(secretKey)) {
    console.log(chalk.yellow('⚠️ secretKey must be uppercase letters only.'))
    return
  }
  const cmd = `echo -n "${secretValue}" | firebase functions:secrets:set ${secretKey} --data-file -`
  const result = await execAsync(cmd)
  console.log(result.stdout, result.stderr)
}
