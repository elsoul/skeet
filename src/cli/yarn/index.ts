import { program } from '@/index'
import { Logger } from '@/lib'
import { yarn } from './yarn'

export const yarnCommands = async () => {
  program
    .command('yarn')
    .description(
      'Skeet Yarn Comannd to run yarn command for multiple functions',
    )
    .argument('<yarnCmd>', 'Yarn Command - e.g. skeet yarn add -D @types/node')
    .option('-p, --p <packageName>', 'npm package name', '')
    .option('-D, --d <packageName>', 'npm package name', '')
    .action(async (yarnCmd: string, options) => {
      if (yarnCmd === 'add' && options.p === '' && options.d !== '') {
        await yarn(yarnCmd, options.d, true)
      } else if (yarnCmd === 'add' && options.p !== '' && options.d === '') {
        await yarn(yarnCmd, options.p, false)
      } else {
        Logger.error('Invalid yarn command')
        process.exit(1)
      }
    })
}
