import { SKEET_CONFIG_CLOUD_PATH } from '@/config/config'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SkeetCloudStatusType } from '@/config/skeetCloud'
import chalk from 'chalk'
import { writeFile } from 'fs/promises'

export const updateSkeetCloudConfigCloudStatus = async (
  status: SkeetCloudStatusType,
) => {
  const config = await readOrCreateConfig()
  config.app.cloudStatus = status
  await writeFile(SKEET_CONFIG_CLOUD_PATH, JSON.stringify(config, null, 2))
  console.log(
    chalk.white(`✔️ Updating skeet-cloud.config.json with status: ${status}`),
  )
  return true
}
