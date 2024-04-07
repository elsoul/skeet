import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SkeetCloudStatusType } from '@/config/skeetCloud'
import { program } from '@/index'
import { initFirebaseProject } from '../init/initStep/initFirebaseProject'
import { deployFirebaseFunctions } from '../init/initStep/deployFirebaseFunctions'
import { generanteGitRepo } from '../init/initStep/generanteGitRepo'
import { createVPN } from '../init/initStep/createVPN'
import chalk from 'chalk'
import { checkAi } from './checkAi'
import { AiLog } from '../ai/aiLog'

export const checkCommands = async () => {
  program
    .command('check')
    .description('Check Cloud Configurations')
    .action(async () => {
      const config = await readOrCreateConfig()
      const lang = config.lang as 'en' | 'ja'
      const logger = new AiLog(lang)
      const cloudStatus: SkeetCloudStatusType = config.app.cloudStatus
      await checkAi({ ai: 'Gemini' }, logger)
      // await checkCloudByStatus(cloudStatus)
    })
}

const checkCloudByStatus = async (cloudStatus: SkeetCloudStatusType) => {
  switch (cloudStatus) {
    case 'NOT_CREATED':
      // Initialize Firebase Project
      await initFirebaseProject()
      break
    case 'PROJECT_CREATED':
      // Deploy Firebase Functions
      await deployFirebaseFunctions()
      break
    case 'FUNCTIONS_CREATED':
      // Add Github Actions
      await generanteGitRepo()
      break
    case 'GITHUB_ACTIONS_CREATED':
      // Add Cloud VPN
      await createVPN()
      break
    case 'VPN_CREATED':
      console.log(chalk.white(`⭐️ You are all set!`))
      break
    default:
      break
  }
}
