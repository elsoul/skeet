import { program } from '@/index'
import { deploy } from './deploy'

export const deployCommands = async () => {
  program
    .command('deploy')
    .description('Deploy Skeet APP to Firebase')
    .action(deploy)
}
