import { program } from '@/index'
import { spawnSync } from 'node:child_process'

export const consoleCommands = async () => {
  program
    .command('console')
    .alias('c')
    .description('Call Firebase Console to Test Functions')
    .action(async () => {
      const cmd = `pnpm shell`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
