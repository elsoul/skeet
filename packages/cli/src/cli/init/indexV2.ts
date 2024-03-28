import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SkeetCloudStatusType } from '@/config/skeetCloud'
import { program } from '@/index'
import { initWhenNotCreated } from './initCloud/initWhenNotCreated'
export * from './askQuestions'

export const initV2Commands = async () => {
  program
    .command('init')
    .description('Initialize Cloud Configurations for Skeet')
    .action(async () => {
      console.log(`Initializing Cloud Configurations for Skeet...`)
      const config = await readOrCreateConfig()
      const cloudStatus: SkeetCloudStatusType = config.app.cloudStatus
      await initCloudByStatus(cloudStatus)
    })
}

const initCloudByStatus = async (cloudStatus: SkeetCloudStatusType) => {
  switch (cloudStatus) {
    case 'NOT_CREATED':
      console.log('Initializing Cloud Configurations for Google Cloud...')
      await initWhenNotCreated()
      break
    case 'PROJECT_CREATED':
      break
    case 'FUNCTIONS_CREATED':
      break
    case 'VPN_CREATED':
      break
    case 'RUNNING':
      break
    default:
      break
  }
}
