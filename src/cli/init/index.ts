import { program } from '@/index'
import { skeetCloudConfigAppGen } from '@/templates/init/skeet-cloud.config-app'
import { initLb } from './initLb'
import { init } from './init'
import { writeFileSync } from 'fs'

export const initCommands = async () => {
  program
    .command('init')
    .option('--only-dev', 'Skip Cloud Setup', false)
    .option('--only-config', 'Generate Skeet Cloud Config', false)
    .option('--load-balancer', 'Setup Cloud Load Balancer', false)
    .description('Initialize Google Cloud Setups for Skeet APP')
    .action(async (options) => {
      if (options.onlyConfig) {
        const data = await skeetCloudConfigAppGen()
        writeFileSync(data.filePath, data.body)
      } else if (options.loadBalancer) {
        await initLb()
      } else {
        await init(options.onlyDev)
      }
    })
}
