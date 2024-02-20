import { program } from '@/index'
import { spawnSync } from 'child_process'
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
        const answer = await inquirer.prompt<{
          packageName: string
          cmd: string
        }>([
          {
            type: 'input',
            name: 'packageName',
            message: 'Package Name:',
            default: 'skeet-func',
          },
          {
            type: 'input',
            name: 'cmd',
            message: 'Command:',
            default: 'install',
          },
        ])
        const pnpmCmd = `pnpm ${answer.packageName} ${answer.cmd}`
        spawnSync(pnpmCmd, { stdio: 'inherit', shell: true })
      }
    })
}
