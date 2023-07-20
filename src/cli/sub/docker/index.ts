import { program } from '@/index'
import { runPsql } from './runPsql'
import { dockerLogin } from './dockerLogin'
export * from './runPsql'

export const dockerSubCommands = async () => {
  const docker = program.command('docker').description('Docker commands')
  docker
    .command('psql')
    .description('Run psql in docker container')
    .action(async () => {
      await runPsql()
    })

  docker
    .command('login')
    .description('Login to docker - ./keyfile.json is required')
    .action(async () => {
      await dockerLogin()
    })
}
