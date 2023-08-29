import { program } from '@/index'
import { release } from './release'
import { execSync } from 'child_process'

export const releaseCommands = () => {
  program
    .command('release')
    .alias('r')
    .description('Release a new version')
    .option('-n, --npm', 'Release to npm', false)
    .action((options) => {
      //execSync(`yarn build`)
      release(options.npm)
    })
}
