import dotenv from 'dotenv'
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
  genCommands,
  testCommands,
} from '@/cli'
import { aiCommands } from './cli/ai'

export const GRAPHQL_ROOT = './graphql'
export const GRAPHQL_ENV_PRODUCTION_PATH = GRAPHQL_ROOT + '/.env.production'
export const GRAPHQL_ENV_BUILD_PATH = GRAPHQL_ROOT + '/.env.build'
export const GRAPHQL_PATH = GRAPHQL_ROOT + '/src/graphql'
export const PRISMA_SCHEMA_PATH = GRAPHQL_ROOT + '/prisma/schema.prisma'
export const SKEET_CONFIG_PATH = './skeet-cloud.config.json'
export const DEFAULT_FUNCTION_NAME = 'skeet'

export const program = new Command()

program
  .name('skeet')
  .description('CLI for Skeet - Full-stack TypeScript Serverless framework')
  .version(VERSION)

dotenv.config()

function main() {
  try {
    testCommands()
    createCommands()
    serverCommands()
    deployCommands()
    initCommands()
    yarnCommands()
    loginCommands()
    curlCommands()
    genCommands()

    dockerSubCommands()
    dbSubCommands()
    iamSubCommands()
    addSubCommands()
    syncSubCommands()
    deleteSubCommands()
    listSubCommands()
    aiCommands()

    program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
