import { getTemplateRepo } from '@/config/repo'
import { program } from '@/index'

export const newCommands = async () => {
  program
    .command('new')
    .description('Create Skeet Framework App')
    .action(async () => {
      await getTemplateRepo('skeet-app')
    })
}
