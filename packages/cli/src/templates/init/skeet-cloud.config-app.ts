import { Logger } from '@/lib/logger'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { defaultSkeetCloudConfig } from '@/config/skeetCloud'

export const skeetCloudConfigAppGen = async () => {
  const filePath = './skeet-cloud.config.json'
  if (await checkFileDirExists(filePath)) {
    Logger.error(`File skeet-cloud.config.json already exists.`)
    process.exit(0)
  }
  const body = JSON.stringify(defaultSkeetCloudConfig, null, 2)
  return {
    filePath,
    body,
  }
}
