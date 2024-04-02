import { program } from '@/index'
import { getAllApps } from '@/lib/files/getAllApps'
import { spawnSync } from 'node:child_process'
import inquirer from 'inquirer'

export type RunOptions = {
  filter: string
  cmd: string
}

export const runCommands = () => {
  const run = program.command('run')

  run
    .description('Run commands')
    .option('-F, --filter <filter>', 'Filter By Package Name', '')
    .option('-C, --cmd <cmd>', 'Command', '')
    .action(async (options: RunOptions) => {
      if (options.filter !== '' && options.cmd !== '') {
        const pnpmCmd = `pnpm ${options.filter} ${options.cmd}`
        spawnSync(pnpmCmd, { stdio: 'inherit', shell: true })
      } else {
        const choices = await getAllApps()
        const answer = await inquirer.prompt<{
          packageNames: string[]
          cmd: string
        }>([
          {
            type: 'checkbox',
            name: 'packageNames',
            message: 'Package Name to Run Cmd:',
            choices,
          },
          {
            type: 'input',
            name: 'cmd',
            message: 'Command:',
            default: 'build',
          },
        ])
        const pnpmCmd = `pnpm -F ${answer.packageNames.join(' -F ')} ${answer.cmd}`
        spawnSync(pnpmCmd, { stdio: 'inherit', shell: true })
      }
    })
}
