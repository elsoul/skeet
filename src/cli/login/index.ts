import { program } from '@/index'
import { login } from './login'

export const loginCommands = async () => {
  program
    .command('login')
    .description('Skeet Login Command - Create Firebase Login Token')
    .option('--email [email]', 'Login Email', '')
    .option('--password [password]', 'Login Password', '')
    .action(async (options) => {
      if (options.email !== '') {
        await login(options.email, options.password)
      } else {
        await login()
      }
    })
}
