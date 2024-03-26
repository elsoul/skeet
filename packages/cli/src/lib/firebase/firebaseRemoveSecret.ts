import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import { writeFile } from 'fs/promises'

export const firebaseRemoveSecret = async (secretKey: string) => {
  const config = await readOrCreateConfig()
  const cmd = `firebase functions:secrets:destroy ${secretKey} --project ${config.app.fbProjectId}`
  const result = await execAsync(cmd)
  if (result.stderr != null && result.stderr.trim() !== '') {
    console.log(chalk.yellow('⚠️ Failed to remove secret.'))
    console.log(result.stderr)
    return
  }
  await removeSecretFromConfig(secretKey)
  console.log(chalk.green(`✅ Successfully removed secret: ${secretKey}`))
  return result
}

export const removeSecretFromConfig = async (secretKey: string) => {
  const config = await readOrCreateConfig()
  config.secretKey = config.secretKey.filter((key) => key !== secretKey)
  const skeetConfigPath = './skeet-cloud.config.json'
  await writeFile(skeetConfigPath, JSON.stringify(config, null, 2))
  console.log(
    chalk.white(
      `✅ Successfully removed secret: ${secretKey} in ${skeetConfigPath}`,
    ),
  )
  return config
}
