import { program } from '@/index'
import { release } from './release'

export const releaseCommands = () => {
  program
    .command('release')
    .alias('r')
    .description('Release a new version')
    .option('-n, --npm', 'Release to npm', false)
    .action(async (options) => {
      release(options.npm)
    })
}
