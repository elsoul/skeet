import { program } from '@/index'
import { skeetTest } from './test'

export const testCommands = async () => {
  program
    .command('test')
    .description('Skeet Jest Test Command')
    .action(async () => {
      await skeetTest()
    })
}
