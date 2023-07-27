import { program } from '@/index'
import { skeetCloudConfigAppGen } from '@/templates/init/skeet-cloud.config-app'
import { initLb } from './initLb'
import { init } from './init'
import { writeFileSync } from 'fs'
export * from './askQuestions'

export const initCommands = async () => {
  program
    .command('init')
    .option('--login', 'Activate Firebase Login', false)
    .option('--config', 'Generate Skeet Cloud Config', false)
    .option('--lb', 'Setup Cloud Load Balancer', false)
    .description('Initialize Google Cloud Setups for Skeet APP')
    .action(async (options) => {
      if (options.config) {
        const data = await skeetCloudConfigAppGen()
        writeFileSync(data.filePath, data.body)
      } else if (options.lb) {
        await initLb()
      } else {
        await init(options.login)
      }
    })
}
