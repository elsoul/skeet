import { program } from '@/index'
import { addProfile, useProfile } from './profile'


export const profileCommands = async () => {
  program
    .command('profile')
    .option('--add', 'Create Development Profile', false)
    .option('--use  <profile name>', 'Switch Development Profile', false)
    .description('Manage Development Profile for Google Cloud and Firebase')
    .action(async (options) => {
      if (options.add) {
        await addProfile()
      } else if (options.use) {
        await useProfile(options.use)
      }
    })
}
