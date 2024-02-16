import { program } from '@/index'
import { login } from './login'

export const loginCommands = async () => {
  program
    .command('login')
    .description('Skeet Login Command - Create Firebase Login Token')
    .action(async (options) => {
      await login()
    })
}
