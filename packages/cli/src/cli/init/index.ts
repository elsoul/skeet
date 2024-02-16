import { program } from '@/index'
import { skeetCloudConfigAppGen } from '@/templates/init/skeet-cloud.config-app'
import { initLb } from './initLb'
import { init } from './init'
import { writeFileSync } from 'fs'
import { importConfig, setupNetwork, setupSQL } from '@/lib'
import { askForSqlPassword } from './askQuestions'
export * from './askQuestions'

type Options = {
  login: boolean
  config: boolean
  lb: boolean
  sql: boolean
  network: boolean
}

export const initCommands = async () => {
  program
    .command('init')
    .option('--login', 'Activate Firebase Login', false)
    .option('--config', 'Generate Skeet Cloud Config', false)
    .option('--lb', 'Setup Cloud Load Balancer', false)
    .option('--sql', 'Setup SQL', false)
    .option('-n, --network', 'Setup Network', false)
    .description('Initialize Google Cloud Setups for Skeet APP')
    .action(async (options: Options) => {
      if (options.config) {
        const data = await skeetCloudConfigAppGen()
        writeFileSync(data.filePath, data.body)
      } else if (options.sql) {
        const skeetConfig = importConfig()
        const sqlPassword = await askForSqlPassword()
        await setupSQL(skeetConfig, sqlPassword, false)
      } else if (options.lb) {
        await initLb()
      } else if (options.network) {
        await setupNetwork()
      } else {
        await init(options.login)
      }
    })
}
