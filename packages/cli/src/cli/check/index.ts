import { program } from '@/index'
import { checkAi } from './checkAi'

export const checkCommands = async () => {
  program
    .command('check')
    .description('Check Cloud Configurations')
    .action(async () => {
      await checkAi({ ai: 'Gemini' })
    })
}
