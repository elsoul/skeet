import { SKEET_CONFIG_CLOUD_PATH } from '@/config/config'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SkeetCloudStatusType } from '@/config/skeetCloud'
import { writeFile } from 'fs/promises'

export const updateSkeetCloudConfigCloudStatus = async (
  status: SkeetCloudStatusType,
) => {
  const config = await readOrCreateConfig()
  config.app.cloudStatus = status
  await writeFile(SKEET_CONFIG_CLOUD_PATH, JSON.stringify(config, null, 2))
  return true
}
