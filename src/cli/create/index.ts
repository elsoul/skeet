import { program } from '@/index'
import { create } from './create'

export const createCommands = async () => {
  program
    .command('create')
    .argument('<appName>', 'Name of the app')
    .description('Create Skeet Framework App')
    .action(async (appName: string) => {
      await create(appName)
    })
}
