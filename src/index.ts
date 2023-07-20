import Dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
import {
  dbSubCommands,
  dockerSubCommands,
  iamSubCommands,
  addSubCommands,
  syncSubCommands,
  deleteSubCommands,
  listSubCommands,
  createCommands,
  serverCommands,
  deployCommands,
  initCommands,
  yarnCommands,
  loginCommands,
  curlCommands,
} from '@/cli'

export const GRAPHQL_PATH = './graphql/src/graphql'
export const PRISMA_SCHEMA_PATH = './graphql/prisma/schema.prisma'
export const API_PATH = './graphql'
export const API_TYPE_PATH = API_PATH + '/src/types'
export const API_ENV_PRODUCTION_PATH = './graphql/.env.production'
export const API_ENV_BUILD_PATH = './graphql/.env.build'

export const program = new Command()

program
  .name('skeet')
  .description('CLI for Skeet - Full-stack TypeScript Serverless framework')
  .version(VERSION)

Dotenv.config()

async function main() {
  // Please check the descriptions if they are correct.
  try {
    await createCommands()
    await serverCommands()
    await deployCommands()
    await initCommands()
    await yarnCommands()
    await loginCommands()
    await curlCommands()

    await dockerSubCommands()
    await dbSubCommands()
    await iamSubCommands()
    await addSubCommands()
    await syncSubCommands()
    await deleteSubCommands()
    await listSubCommands()

    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
