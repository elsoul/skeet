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
  postCommands,
} from '@/cli'
import { isSQLexists } from './lib'
import { addIp } from './cli/sub/add/addIp'
import { skeetTest } from './cli/test/test'

export const GRAPHQL_ROOT = './graphql'
export const GRAPHQL_ENV_PRODUCTION_PATH = GRAPHQL_ROOT + '/.env.production'
export const GRAPHQL_ENV_BUILD_PATH = GRAPHQL_ROOT + '/.env.build'
export const GRAPHQL_PATH = GRAPHQL_ROOT + '/src/graphql'
export const PRISMA_SCHEMA_PATH = GRAPHQL_ROOT + '/prisma/schema.prisma'
export const SKEET_CONFIG_PATH = './skeet-cloud.config.json'
export const DEFAULT_FUNCTION_NAME = 'openai'

export const program = new Command()

program
  .name('skeet')
  .description('CLI for Skeet - Full-stack TypeScript Serverless framework')
  .version(VERSION)

dotenv.config()

async function main() {
  try {
    await createCommands()
    await serverCommands()
    await deployCommands()
    await initCommands()
    await yarnCommands()
    await loginCommands()
    await curlCommands()
    await postCommands()
    await genCommands()

    await dockerSubCommands()
    await dbSubCommands()
    await iamSubCommands()
    await addSubCommands()
    await syncSubCommands()
    await deleteSubCommands()
    await listSubCommands()
    program.command('test').action(async () => {
      console.log('test start')
      await skeetTest()
    })

    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
