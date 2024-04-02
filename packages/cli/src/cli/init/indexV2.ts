import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SkeetCloudStatusType } from '@/config/skeetCloud'
import { program } from '@/index'
import { initWhenNotCreated } from './initCloud/initWhenNotCreated'
import { initWhenProjectCreated } from './initCloud/initWhenProjectCreated'
import { initWhenFunctionsCreated } from './initCloud/initWhenFunctionsCreated'
import { initWhenGithubActionsCreated } from './initCloud/initWhenGithubActionsCreated'
import { initWhenVPNCreated } from './initCloud/initWhenVPNCreated'
import { initWhenSQLCreated } from './initCloud/initWhenSQLCreated'
import chalk from 'chalk'
export * from './askQuestions'

export const initV2Commands = async () => {
  program
    .command('init')
    .description('Initialize Cloud Configurations')
    .action(async () => {
      const config = await readOrCreateConfig()
      const cloudStatus: SkeetCloudStatusType = config.app.cloudStatus
      await initCloudByStatus(cloudStatus)
    })
}

const initCloudByStatus = async (cloudStatus: SkeetCloudStatusType) => {
  switch (cloudStatus) {
    case 'NOT_CREATED':
      // Initialize Firebase Project
      await initWhenNotCreated()
      break
    case 'PROJECT_CREATED':
      // Deploy Firebase Functions
      await initWhenProjectCreated()
      break
    case 'FUNCTIONS_CREATED':
      // Add Github Actions
      await initWhenFunctionsCreated()
      break
    case 'GITHUB_ACTIONS_CREATED':
      // Add Cloud VPN
      await initWhenGithubActionsCreated()
      break
    case 'VPN_CREATED':
      // Add Cloud SQL
      await initWhenVPNCreated()
      break
    case 'SQL_CREATED':
      await initWhenSQLCreated()
      break
    case 'RUNNING':
      console.log(chalk.white('🚀 Your Project looks perfect!'))
      break
    default:
      break
  }
}
