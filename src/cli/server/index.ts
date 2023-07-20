import { program } from '@/index'
import { server } from './server'

export const serverCommands = async () => {
  program
    .command('server')
    .description('Run Skeet App')
    .alias('s')
    .action(server)
}
