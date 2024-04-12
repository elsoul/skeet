import { program } from '@/index'
import { create } from './create'
import { createBackend } from './createBackend'
import chalk from 'chalk'

export const createCommands = async () => {
  program
    .command('create')
    .argument('<appName>', 'Name of the app')
    .description('Create Skeet Framework App')
    .option('-b, --backend', 'Create Backend Only', false)
    .action(async (appName: string, options: { backend: boolean }) => {
      console.log(
        chalk.yellow(
          `⚠️ This command will be deprecated in the future. Please use '$ skeet new' command instead.`,
        ),
      )
      if (options.backend) {
        await createBackend(appName)
      } else {
        await create(appName)
      }
    })
}
