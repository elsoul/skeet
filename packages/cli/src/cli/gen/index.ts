import { program } from '@/index'
import { genScaffoldAll } from '.'
import { genScaffoldSingle } from './genScaffold'

export * from './genScaffold'
export * from './genGithubActions'

type ScaffoldOptions = {
  d: string
}

export const genCommands = async () => {
  const gen = program
    .command('g')
    .alias('generate')
    .description('Skeet Generate Comannd')

  gen
    .command('scaffold')
    .option('-d <d>', 'Database', 'all')
    .action(async (options: ScaffoldOptions) => {
      if (options.d !== 'all') {
        await genScaffoldSingle(options.d)
        return
      }
      await genScaffoldAll()
    })
}
