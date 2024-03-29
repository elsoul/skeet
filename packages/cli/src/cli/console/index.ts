import { program } from '@/index'
import { getFunctions } from '@/lib'
import { spawnSync } from 'child_process'
import inquirer from 'inquirer'

export const consoleCommands = async () => {
  program
    .command('console')
    .alias('c')
    .description('Call Firebase Console to Test Functions')
    .action(async () => {
      const functions = await getFunctions()
      if (functions.length === 0) {
        console.log('No Functions Found')
        return
      } else if (functions.length === 1) {
        console.log('Opening Firebase Console...')
        const cmd = `pnpm -F skeet-func shell`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
        return
      } else {
        const answer = await inquirer.prompt<{ functions: Array<string> }>([
          {
            type: 'list',
            message: 'Select Services to run functions command',
            name: 'functions',
            choices: [new inquirer.Separator(' = Services = '), ...functions],

            validate(answer) {
              if (answer.length < 1) {
                return 'You must choose at least one service.'
              }

              return true
            },
          },
        ])
        console.log('Opening Firebase Console...')
        const cmd = `pnpm -F ${answer.functions} shell`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
      }
    })
}
