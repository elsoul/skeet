import { program } from '@/index'
import { runPsql } from './runPsql'
export * from './runPsql'

export const dockerSubCommands = async () => {
  const docker = program.command('docker').description('Docker commands')
  docker
    .command('psql')
    .description('Run psql in docker container')
    .action(async () => {
      await runPsql()
    })
}
