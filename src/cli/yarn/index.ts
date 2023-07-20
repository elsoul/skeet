import { program } from '@/index'
import { Logger } from '@/lib'
import { yarn } from './yarn'

export const yarnCommands = async () => {
  program
    .command('yarn')
    .description(
      'Skeet Yarn Comannd to run yarn command for multiple functions'
    )
    .argument('<yarnCmd>', 'Yarn Command - e.g. skeet yarn add -D @types/node')
    .option('-p, --p <packageName>', 'npm package name', '')
    .option('-D', 'Dependency environment', false)
    .action(async (yarnCmd: string, options) => {
      if (yarnCmd === 'add' && options.p === '') {
        Logger.error('You need to define package name!')
        process.exit(1)
      }
      await yarn(yarnCmd, options.p, options.D)
    })
}
