import { program } from '@/index'
import { create } from './create'
import { createBackend } from './createBackend'

export const createCommands = async () => {
  program
    .command('create')
    .argument('<appName>', 'Name of the app')
    .description('Create Skeet Framework App')
    .option('-b, --backend', 'Create Backend Only', false)
    .action(async (appName: string, options: { backend: boolean }) => {
      if (options.backend) {
        await createBackend(appName)
      } else {
        await create(appName)
      }
    })
}
