import { program } from '@/index'
import { server } from './server'

export type ServerOptions = {
  backend: boolean
  functions: boolean
  web: boolean
}

export const serverCommands = async () => {
  program
    .command('server')
    .description('Run Skeet App')
    .alias('s')
    .option(`-b, --backend`, 'Run Backend only')
    .option(`-f, --functions`, 'Run Firebase Functions only')
    .option(`-w, --web`, 'Run Web App only')
    .action(async (options: ServerOptions) => {
      console.log('Running Skeet App...')
      await server(options)
    })
}
