import { program } from '@/index'
import { genScaffoldAll } from '.'

export * from './genScaffold'
export * from './genGithubActions'

export const genCommands = async () => {
  const gen = program
    .command('g')
    .alias('generate')
    .description('Skeet Generate Comannd')

  gen.command('scaffold').action(async () => {
    await genScaffoldAll()
  })
}
