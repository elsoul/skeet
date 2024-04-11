import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import { writeFile } from 'fs/promises'

export const firebaseAddSecret = async (
  secretKey: string,
  secretValue: string,
) => {
  const config = await readOrCreateConfig()
  if (!/^[A-Z_]+$/.test(secretKey)) {
    console.log(chalk.yellow('⚠️ secretKey must be uppercase letters only.'))
    return
  }
  const cmd = `echo "${secretValue}" | firebase functions:secrets:set ${secretKey} --project ${config.app.projectId} --data-file -`
  const result = await execAsync(cmd)
  if (result.stderr != null && result.stderr.trim() !== '') {
    console.log(chalk.yellow('⚠️ Failed to add secret.'))
    console.log(result.stderr)
  }
  await addSecretToConfig(secretKey)
  console.log(result.stdout)
}

const addSecretToConfig = async (secretKey: string) => {
  const config = await readOrCreateConfig()
  config.secretKey.push(secretKey)
  // unique array
  config.secretKey = [...new Set(config.secretKey)]
  const skeetConfigPath = './skeet-cloud.config.json'
  await writeFile(skeetConfigPath, JSON.stringify(config, null, 2))
  console.log(
    chalk.white(
      `✅ Successfully added secret: ${secretKey} in ${skeetConfigPath}`,
    ),
  )
  return config
}
