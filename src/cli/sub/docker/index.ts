import { program } from '@/index'
import { runPsql } from './runPsql'
import { dockerLogin } from './dockerLogin'
import { dockerRun } from './dockerRun'
import { dockerBuild } from './dockerBuild'
import { dockerRm } from './dockerRm'
export * from './runPsql'
export * from './dockerLogin'
export * from './buildContainer'
export * from './tagContainer'
export * from './pushContainer'

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

  docker
    .command('run')
    .description('Run Skeet GraphQL Backend Container')
    .action(async () => {
      await dockerRun()
    })

  docker
    .command('build')
    .description('Build Skeet GraphQL Backend Container')
    .action(async () => {
      await dockerBuild()
    })

  docker
    .command('rm')
    .description('Remove Skeet GraphQL Backend Container')
    .action(async () => {
      await dockerRm()
    })
}
